import { NotFoundException } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';

describe('ProfileResolver', () => {
  const profileService = { findMain: jest.fn() };
  const resolver = new ProfileResolver(
    profileService as never,
    { findAll: jest.fn() } as never,
    { findAll: jest.fn() } as never,
    { findAll: jest.fn() } as never,
  );

  beforeEach(() => {
    profileService.findMain.mockReset();
  });

  describe('profile', () => {
    it('hands the GraphQL layer the stored profile when the slug resolves', async () => {
      const stored = { id: 'profile-1', slug: 'main', name: 'Александр Гудзь' };
      profileService.findMain.mockResolvedValue(stored);

      await expect(resolver.profile()).resolves.toBe(stored);
    });

    it('raises NotFoundException on null so clients get a GraphQL error, not a null blob', async () => {
      profileService.findMain.mockResolvedValue(null);

      await expect(resolver.profile()).rejects.toThrow(NotFoundException);
    });

    it('raises NotFoundException when the lookup yields undefined as well', async () => {
      profileService.findMain.mockResolvedValue(undefined);

      await expect(resolver.profile()).rejects.toThrow(NotFoundException);
    });
  });

  it('resolves profile skills without a category so the nested field lists everything', async () => {
    const skillService = { findAll: jest.fn().mockResolvedValue([]) };
    const withSkills = new ProfileResolver(
      profileService as never,
      skillService as never,
      { findAll: jest.fn() } as never,
      { findAll: jest.fn() } as never,
    );

    await withSkills.skills();

    expect(skillService.findAll).toHaveBeenCalledWith();
  });

  it('resolves profile projects unfiltered so featured and archived entries both show', async () => {
    const projectService = { findAll: jest.fn().mockResolvedValue([]) };
    const withProjects = new ProfileResolver(
      profileService as never,
      { findAll: jest.fn() } as never,
      { findAll: jest.fn() } as never,
      projectService as never,
    );

    await withProjects.projects();

    expect(projectService.findAll).toHaveBeenCalledWith();
  });
});