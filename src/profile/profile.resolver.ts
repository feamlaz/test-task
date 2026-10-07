import { NotFoundException } from '@nestjs/common';
import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExperienceModel } from '../experience/models/experience.model';
import { ExperienceService } from '../experience/experience.service';
import { ProjectModel } from '../projects/models/project.model';
import { ProjectService } from '../projects/projects.service';
import { SkillModel } from '../skills/models/skill.model';
import { SkillService } from '../skills/skills.service';
import { ProfileModel } from './models/profile.model';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly skillService: SkillService,
    private readonly experienceService: ExperienceService,
    private readonly projectService: ProjectService,
  ) {}

  @Query(() => ProfileModel)
  async profile() {
    const profile = await this.profileService.findMain();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  @ResolveField(() => [SkillModel])
  skills(): Promise<SkillModel[]> {
    return this.skillService.findAll();
  }

  @ResolveField(() => [ExperienceModel])
  experience() {
    return this.experienceService.findAll();
  }

  @ResolveField(() => [ProjectModel])
  projects() {
    return this.projectService.findAll();
  }
}