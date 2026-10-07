import { SkillService } from './skills.service';

describe('SkillService.findAll', () => {
  const findMany = jest.fn();
  const service = new SkillService({ skill: { findMany } } as never);

  const lastQuery = () => findMany.mock.calls.at(-1)![0];

  beforeEach(() => {
    findMany.mockReset();
    findMany.mockResolvedValue([]);
  });

  it('narrows to the requested category when one is given', async () => {
    await service.findAll('Данные');

    expect(lastQuery().where).toEqual({ category: 'Данные' });
  });

  it('leaves the filter out entirely when no category is given, so every skill comes back', async () => {
    await service.findAll();

    expect(lastQuery().where).toBeUndefined();
    expect(lastQuery()).not.toHaveProperty('where.category');
  });

  it('treats an empty string as no filter rather than matching a category named ""', async () => {
    await service.findAll('');

    expect(lastQuery().where).toBeUndefined();
  });

  it('groups by category then name so the list reads alphabetically within each group', async () => {
    await service.findAll('AI и LLM');

    expect(lastQuery().orderBy).toEqual([
      { category: 'asc' },
      { name: 'asc' },
    ]);
  });

  it('keeps the category filter alongside the ordering clauses instead of replacing it', async () => {
    await service.findAll('Backend');

    expect(lastQuery()).toMatchObject({
      where: { category: 'Backend' },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  });
});