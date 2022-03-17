import { registerEnumType } from '@nestjs/graphql';

export enum Sex {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

registerEnumType(Sex, { name: 'Sex' });
