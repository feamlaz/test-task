import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ContactKind } from './contact-kind.enum';

@ObjectType('Contact')
export class ContactModel {
  @Field(() => ID)
  id!: string;

  @Field(() => ContactKind)
  kind!: ContactKind;

  @Field()
  label!: string;

  @Field()
  value!: string;
}