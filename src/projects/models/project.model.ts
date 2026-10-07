import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SkillModel } from '../../skills/models/skill.model';

@ObjectType('Project')
export class ProjectModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  repositoryUrl!: string;

  @Field(() => String, { nullable: true })
  liveUrl!: string | null;

  @Field()
  period!: string;

  @Field()
  featured!: boolean;

  @Field(() => [String])
  tech!: string[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];
}