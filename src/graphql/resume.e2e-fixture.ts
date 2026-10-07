type SkillRow = {
  id: string;
  name: string;
  category: string;
};

type SkillLink = { skill: SkillRow };

const skillRows: SkillRow[] = [
  { id: 'skill-1', name: 'TypeScript', category: 'Backend' },
  { id: 'skill-2', name: 'PostgreSQL', category: 'Данные' },
  { id: 'skill-3', name: 'ClickHouse', category: 'Данные' },
  { id: 'skill-4', name: 'GraphQL', category: 'API и интеграции' },
  { id: 'skill-5', name: 'RAG', category: 'AI и LLM' },
  { id: 'skill-6', name: 'React', category: 'Фронтенд' },
];

function link(...ids: string[]): SkillLink[] {
  return ids.map((id) => ({ skill: skillRows.find((row) => row.id === id) as SkillRow }));
}

export const profileRow = {
  id: 'profile-1',
  slug: 'main',
  name: 'Александр Гудзь',
  title: 'Full-stack Product Engineer',
  description:
    'Закрываю весь цикл продукта: бэкенд, данные, интеграции, платежи, фронтенд, аналитика.',
  location: 'Москва',
  contacts: [
    { id: 'contact-1', kind: 'GITHUB', label: 'GitHub', value: 'https://github.com/Feamlaz', position: 0 },
    { id: 'contact-2', kind: 'EMAIL', label: 'Email', value: 'alexand-g@bk.ru', position: 2 },
  ],
  createdAt: new Date('2026-01-10T08:00:00.000Z'),
  updatedAt: new Date('2026-09-02T11:30:00.000Z'),
};

const experienceRows = [
  {
    id: 'exp-1',
    slug: 'grand-fullstack',
    company: 'Гранд',
    position: 'Fullstack-разработчик',
    startDate: new Date('2022-07-01T00:00:00.000Z'),
    endDate: new Date('2025-08-01T00:00:00.000Z'),
    sortOrder: 1,
    achievements: [
      { id: 'ach-1', text: 'Внедрил RAG-систему контекстного поиска', position: 0, experienceId: 'exp-1' },
      { id: 'ach-2', text: 'Собрал пайплайн обновления базы знаний на n8n', position: 1, experienceId: 'exp-1' },
    ],
    skills: link('skill-1', 'skill-2', 'skill-3', 'skill-5'),
  },
  {
    id: 'exp-2',
    slug: 'ip-frontend',
    company: 'ИП',
    position: 'Frontend-разработчик',
    startDate: new Date('2023-02-01T00:00:00.000Z'),
    endDate: new Date('2026-05-01T00:00:00.000Z'),
    sortOrder: 2,
    achievements: [
      {
        id: 'ach-3',
        text: 'Снизил операционные затраты отдела продаж на 40%',
        position: 0,
        experienceId: 'exp-2',
      },
    ],
    skills: link('skill-1', 'skill-4', 'skill-6'),
  },
];

const projectRows = [
  {
    id: 'proj-1',
    name: 'CRM-Site',
    description: 'CRM для управления лендингами, метриками и рекламными кампаниями.',
    repositoryUrl: 'https://github.com/Feamlaz/CRM-Site',
    liveUrl: null,
    period: '2025 — настоящее время',
    tech: ['React', 'Fastify', 'Prisma'],
    featured: true,
    sortOrder: 1,
    skills: link('skill-6', 'skill-2'),
  },
  {
    id: 'proj-2',
    name: 'Subscription Aggregator',
    description: 'Микросервис на Go для агрегации данных по подпискам.',
    repositoryUrl: 'https://github.com/Feamlaz/subscription-aggregator',
    liveUrl: null,
    period: '2025 — 2026',
    tech: ['Go', 'REST', 'PostgreSQL'],
    featured: true,
    sortOrder: 2,
    skills: link('skill-2'),
  },
  {
    id: 'proj-3',
    name: 'Sentinel',
    description: 'Система мониторинга HTTP-эндпоинтов, SSL-сертификатов и DNS-резолва.',
    repositoryUrl: 'https://github.com/Feamlaz/Sentinel',
    liveUrl: null,
    period: '2026 — активный',
    tech: ['Python', 'FastAPI', 'SQLite'],
    featured: false,
    sortOrder: 3,
    skills: link(),
  },
];

type SkillQuery = { where?: { category?: string } };
type ProjectQuery = { where?: { featured?: boolean } };

export function createPrismaStub() {
  return {
    profile: {
      findUnique: jest.fn(async () => profileRow),
    },
    skill: {
      findMany: jest.fn(async (query: SkillQuery = {}) =>
        skillRows.filter((row) =>
          query.where?.category === undefined ? true : row.category === query.where.category,
        ),
      ),
    },
    experience: {
      findMany: jest.fn(async () => experienceRows),
    },
    project: {
      findMany: jest.fn(async (query: ProjectQuery = {}) =>
        projectRows.filter((row) =>
          query.where?.featured === undefined ? true : row.featured === query.where.featured,
        ),
      ),
    },
  };
}