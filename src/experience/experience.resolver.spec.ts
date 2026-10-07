import { ExperienceResolver } from './experience.resolver';

describe('ExperienceResolver', () => {
  const experienceService = { findAll: jest.fn() };
  const resolver = new ExperienceResolver(experienceService as never);

  beforeEach(() => {
    experienceService.findAll.mockReset();
    experienceService.findAll.mockResolvedValue([]);
  });

  it('reads jobs through the service on the top-level query', async () => {
    await resolver.experience();

    expect(experienceService.findAll).toHaveBeenCalledWith();
  });

  it('unwraps the { skill } join rows into plain skill objects', () => {
    const parent = {
      skills: [
        { skill: { id: 'skill-1', name: 'TypeScript', category: 'Backend' } },
        { skill: { id: 'skill-5', name: 'RAG', category: 'AI и LLM' } },
      ],
    };

    expect(resolver.skills(parent)).toEqual([
      { id: 'skill-1', name: 'TypeScript', category: 'Backend' },
      { id: 'skill-5', name: 'RAG', category: 'AI и LLM' },
    ]);
  });

  it('returns an empty list for a job with no skill links', () => {
    expect(resolver.skills({ skills: [] })).toEqual([]);
  });
});