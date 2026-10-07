import { registerEnumType } from '@nestjs/graphql';

export enum ContactKind {
  GITHUB = 'GITHUB',
  TELEGRAM = 'TELEGRAM',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

registerEnumType(ContactKind, { name: 'ContactKind' });