import { ProjectService } from './projects.service';

describe('ProjectService.findAll', () => {
  const findMany = jest.fn();
  const service = new ProjectService({ project: { findMany } } as never);

  const lastQuery = () => findMany.mock.calls.at(-1)![0];

  beforeEach(() => {
    findMany.mockReset();
    findMany.mockResolvedValue([]);
  });

  it('filters down to featured projects when onlyFeatured is on', async () => {
    await service.findAll(true);

    expect(lastQuery().where).toEqual({ featured: true });
  });

  it('drops the filter for featuredOnly=false, returning the unfeatured work too', async () => {
    await service.findAll(false);

    expect(lastQuery().where).toBeUndefined();
  });

  it('defaults to the full list when called with no argument', async () => {
    await service.findAll();

    expect(lastQuery().where).toBeUndefined();
  });

  it('includes the skill join rows the resolver maps to plain skill objects', async () => {
    await service.findAll(true);

    expect(lastQuery().include).toEqual({ skills: { include: { skill: true } } });
  });

  it('keeps sorting by sortOrder then name for both filtered and unfiltered calls', async () => {
    await service.findAll(true);
    await service.findAll();

    expect(lastQuery().orderBy).toEqual([{ sortOrder: 'asc' }, { name: 'asc' }]);
  });
});