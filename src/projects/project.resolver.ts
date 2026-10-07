import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SkillModel } from '../skills/models/skill.model';
import { ProjectModel } from './models/project.model';
import { ProjectService } from './projects.service';

@Resolver(() => ProjectModel)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectModel])
  projects(@Args('featuredOnly', { type: () => Boolean, nullable: true }) featuredOnly?: boolean) {
    return this.projectService.findAll(featuredOnly ?? false);
  }

  @ResolveField(() => [SkillModel])
  skills(@Parent() project: { skills: { skill: SkillModel }[] }): SkillModel[] {
    return project.skills.map((link) => link.skill);
  }
}