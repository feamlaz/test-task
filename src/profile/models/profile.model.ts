import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ExperienceModel } from '../../experience/models/experience.model';
import { ProjectModel } from '../../projects/models/project.model';
import { SkillModel } from '../../skills/models/skill.model';
import { ContactModel } from './contact.model';

@ObjectType('Profile')
export class ProfileModel {
  @Field(() => ID)
  id!: string;

  @Field()
  slug!: string;

  @Field()
  name!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  location!: string;

  @Field(() => [ContactModel])
  contacts!: ContactModel[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];

  @Field(() => [ExperienceModel])
  experience!: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];
}