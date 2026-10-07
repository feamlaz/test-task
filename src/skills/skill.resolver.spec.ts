import { SkillResolver } from './skill.resolver';

describe('SkillResolver.skills', () => {
  const skillService = { findAll: jest.fn() };
  const resolver = new SkillResolver(skillService as never);

  beforeEach(() => {
    skillService.findAll.mockReset();
    skillService.findAll.mockResolvedValue([]);
  });

  it('forwards the category argument so the resolver does no filtering itself', async () => {
    await resolver.skills('Данные');

    expect(skillService.findAll).toHaveBeenCalledWith('Данные');
  });

  it('calls the service with no argument when the client omits category', async () => {
    await resolver.skills(undefined);

    expect(skillService.findAll).toHaveBeenCalledWith(undefined);
  });
});