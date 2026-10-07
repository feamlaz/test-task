import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SkillModel } from '../../skills/models/skill.model';
import { AchievementModel } from './achievement.model';

@ObjectType('Experience')
export class ExperienceModel {
  @Field(() => ID)
  id!: string;

  @Field()
  slug!: string;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  endDate!: Date | null;

  @Field(() => [AchievementModel])
  achievements!: AchievementModel[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];
}