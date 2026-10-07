import { ProjectResolver } from './project.resolver';

describe('ProjectResolver', () => {
  const projectService = { findAll: jest.fn() };
  const resolver = new ProjectResolver(projectService as never);

  beforeEach(() => {
    projectService.findAll.mockReset();
    projectService.findAll.mockResolvedValue([]);
  });

  describe('projects', () => {
    it('reads featuredOnly=false when the argument is omitted, listing all projects', async () => {
      await resolver.projects(undefined);

      expect(projectService.findAll).toHaveBeenCalledWith(false);
    });

    it('does not flip the fallback to true when the argument is omitted', async () => {
      await resolver.projects();

      expect(projectService.findAll).not.toHaveBeenCalledWith(true);
    });

    it('passes an explicit featuredOnly=true straight through', async () => {
      await resolver.projects(true);

      expect(projectService.findAll).toHaveBeenCalledWith(true);
    });

    it('passes an explicit false through unchanged', async () => {
      await resolver.projects(false);

      expect(projectService.findAll).toHaveBeenCalledWith(false);
    });
  });

  describe('skills', () => {
    it('unwraps the { skill } join rows into plain skill objects', () => {
      const parent = {
        skills: [
          { skill: { id: 'skill-2', name: 'PostgreSQL', category: 'Данные' } },
          { skill: { id: 'skill-6', name: 'React', category: 'Фронтенд' } },
        ],
      };

      expect(resolver.skills(parent)).toEqual([
        { id: 'skill-2', name: 'PostgreSQL', category: 'Данные' },
        { id: 'skill-6', name: 'React', category: 'Фронтенд' },
      ]);
    });

    it('returns an empty list for a project with no skill links instead of throwing', () => {
      expect(resolver.skills({ skills: [] })).toEqual([]);
    });

    it('preserves join order, which decides the order of the nested field', () => {
      const parent = {
        skills: [
          { skill: { id: 'skill-6', name: 'React', category: 'Фронтенд' } },
          { skill: { id: 'skill-2', name: 'PostgreSQL', category: 'Данные' } },
        ],
      };

      expect(resolver.skills(parent).map((skill) => skill.name)).toEqual([
        'React',
        'PostgreSQL',
      ]);
    });
  });
});