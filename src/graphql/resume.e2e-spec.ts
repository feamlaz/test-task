import './resume.e2e-env';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { createPrismaStub } from './resume.e2e-fixture';

describe('GraphQL resume API (e2e)', () => {
  let app: INestApplication;
  let prisma: ReturnType<typeof createPrismaStub>;

  const post = (query: string) => request(app.getHttpServer()).post('/graphql').send({ query });

  beforeAll(async () => {
    prisma = createPrismaStub();

    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  beforeEach(() => {
    prisma.profile.findUnique.mockClear();
    prisma.skill.findMany.mockClear();
    prisma.experience.findMany.mockClear();
    prisma.project.findMany.mockClear();
  });

  it('serves the assignment query with skills, experience and projects resolved together', async () => {
    const response = await post(`
      query {
        profile {
          name
          description
          skills { name }
          experience { company position }
          projects { name }
        }
      }
    `);

    expect(response.body.errors).toBeUndefined();

    const { profile } = response.body.data;
    expect(profile.name).toBe('Александр Гудзь');
    expect(profile.description).toContain('Закрываю весь цикл продукта');
    expect(profile.skills.map((skill: { name: string }) => skill.name)).toContain('PostgreSQL');
    expect(profile.experience.map((job: { company: string }) => job.company)).toEqual([
      'Гранд',
      'ИП',
    ]);
    expect(profile.experience[0].position).toBe('Fullstack-разработчик');
    expect(profile.projects.map((project: { name: string }) => project.name)).toEqual([
      'CRM-Site',
      'Subscription Aggregator',
      'Sentinel',
    ]);
  });

  it('returns contacts on the profile, ordered by their curated position', async () => {
    const response = await post('{ profile { contacts { kind value } } }');

    expect(response.body.data.profile.contacts.map((c: { kind: string }) => c.kind)).toEqual([
      'GITHUB',
      'EMAIL',
    ]);
  });

  it('passes skills(category) down as a where clause instead of filtering in the resolver', async () => {
    const response = await post('{ skills(category: "Данные") { name category } }');

    expect(prisma.skill.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { category: 'Данные' } }),
    );
    expect(response.body.data.skills).toEqual([
      { name: 'PostgreSQL', category: 'Данные' },
      { name: 'ClickHouse', category: 'Данные' },
    ]);
  });

  it('lists every skill when category is omitted', async () => {
    const response = await post('{ skills { name } }');

    expect(prisma.skill.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: undefined }),
    );
    expect(response.body.data.skills).toHaveLength(6);
  });

  it('returns only featured projects for featuredOnly: true', async () => {
    const response = await post('{ projects(featuredOnly: true) { name featured } }');

    expect(prisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { featured: true } }),
    );
    expect(response.body.data.projects).toEqual([
      { name: 'CRM-Site', featured: true },
      { name: 'Subscription Aggregator', featured: true },
    ]);
  });

  it('treats a missing featuredOnly argument as all projects, not the featured subset', async () => {
    const response = await post('{ projects { name } }');

    expect(prisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: undefined }),
    );
    expect(response.body.data.projects).toHaveLength(3);
  });

  it('maps join rows to skills on both projects and experience', async () => {
    const response = await post(`
      {
        projects(featuredOnly: true) { name skills { name } }
        experience { company achievements { text } skills { name } }
      }
    `);

    expect(response.body.data.projects[0].skills).toEqual([
      { name: 'React' },
      { name: 'PostgreSQL' },
    ]);
    expect(response.body.data.experience[0].skills).toEqual([
      { name: 'TypeScript' },
      { name: 'PostgreSQL' },
      { name: 'ClickHouse' },
      { name: 'RAG' },
    ]);
    expect(response.body.data.experience[0].achievements).toHaveLength(2);
  });

  it('returns an empty skill list for a project without links rather than erroring', async () => {
    const response = await post('{ projects { name skills { name } } }');

    const sentinel = response.body.data.projects.find(
      (project: { name: string }) => project.name === 'Sentinel',
    );
    expect(sentinel.skills).toEqual([]);
  });

  it('surfaces a GraphQL error when the main profile is gone', async () => {
    prisma.profile.findUnique.mockResolvedValueOnce(null as never);

    const response = await post('{ profile { name } }');

    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe('Profile not found');
    expect(response.body.data).toBeNull();
    expect(prisma.profile.findUnique).toHaveBeenCalledTimes(1);
  });

  it('reports validation errors for an unknown field without taking the server down', async () => {
    const response = await post('{ profile { nickname } }');

    expect(response.body.errors[0].message).toContain('nickname');
    expect(prisma.profile.findUnique).not.toHaveBeenCalled();
  });

  it('answers the health endpoint independently of GraphQL', async () => {
    const response = await request(app.getHttpServer()).get('/health');

    expect(response.body.status).toBe('ok');
  });
});