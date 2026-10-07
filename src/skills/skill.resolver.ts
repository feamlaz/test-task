import { Args, Query, Resolver } from '@nestjs/graphql';
import { SkillModel } from './models/skill.model';
import { SkillService } from './skills.service';

@Resolver(() => SkillModel)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Query(() => [SkillModel])
  skills(@Args('category', { type: () => String, nullable: true }) category?: string) {
    return this.skillService.findAll(category);
  }
}