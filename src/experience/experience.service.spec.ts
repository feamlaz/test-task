import { ExperienceService } from './experience.service';

describe('ExperienceService.findAll', () => {
  const findMany = jest.fn();
  const service = new ExperienceService({ experience: { findMany } } as never);

  beforeEach(() => {
    findMany.mockReset();
    findMany.mockResolvedValue([]);
  });

  it('returns jobs newest-first via the curated sortOrder column', async () => {
    await service.findAll();

    expect(findMany.mock.calls[0][0].orderBy).toEqual({ sortOrder: 'asc' });
  });

  it('orders achievements by position so bullet points keep their written sequence', async () => {
    await service.findAll();

    expect(findMany.mock.calls[0][0].include.achievements).toEqual({
      orderBy: { position: 'asc' },
    });
  });

  it('joins the skill rows behind each link, otherwise skills resolve to empty on the job', async () => {
    await service.findAll();

    expect(findMany.mock.calls[0][0].include.skills).toEqual({ include: { skill: true } });
  });

  it('issues a single query with all includes rather than one round trip per job', async () => {
    await service.findAll();

    expect(findMany).toHaveBeenCalledTimes(1);
  });
});