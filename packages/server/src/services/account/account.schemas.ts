import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';

import { Payload } from '../../api/common.schemas';
import { Node } from '../../api/nodes';
import { Member } from './models/member.entity';
import { Sex } from './sex.enum';

@ObjectType()
export class AuthenticateResult {
  @Field()
  accessToken: string;
  @Field()
  accessTokenExpiry: number;
  @Field()
  refreshToken: string;
  @Field()
  refreshTokenExpiry: number;
}

@ObjectType({ implements: Node })
export class PublicUser implements Node {
  static TYPE = 'USER';

  @Field(() => ID, { name: 'id' })
  get relayId() {
    return toGlobalId(PublicUser.TYPE, this.id);
  }

  id: string;

  @Field(() => String)
  fullName: string;
}

@ObjectType({ implements: Payload })
export class AuthenticatePayload extends Payload<AuthenticateResult> {
  @Field(() => AuthenticateResult, { nullable: true })
  result: AuthenticateResult | null;
}

@ObjectType()
export class GenerateCaptchaResult {
  @Field()
  data: string;
}

@ObjectType({ implements: Payload })
export class GenerateCaptchaPayload extends Payload<GenerateCaptchaResult> {
  @Field(() => GenerateCaptchaResult, { nullable: true })
  result: GenerateCaptchaResult | null;
}

@ObjectType({ implements: Payload })
export class MemberPayload extends Payload<Member> {
  @Field(() => Member, { nullable: true })
  result: Member | null;
}

@ArgsType()
export class UpdateProfileArgs {
  @Field()
  fullName: string;
  @Field(() => Sex, { nullable: true })
  sex?: Sex;
  @Field({ nullable: true })
  birthday?: Date;
  @Field()
  address: string;
}

@ArgsType()
export class UpdatePasswordArgs {
  @Field()
  currentPassword: string;
  @Field()
  repeatPassword: string;
  @Field()
  newPassword: string;
  @Field()
  captcha: string;
}
