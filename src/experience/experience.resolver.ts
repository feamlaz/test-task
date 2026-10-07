import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SkillModel } from '../skills/models/skill.model';
import { ExperienceModel } from './models/experience.model';
import { ExperienceService } from './experience.service';

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => [ExperienceModel])
  experience() {
    return this.experienceService.findAll();
  }

  @ResolveField(() => [SkillModel])
  skills(@Parent() experience: { skills: { skill: SkillModel }[] }): SkillModel[] {
    return experience.skills.map((link) => link.skill);
  }
}