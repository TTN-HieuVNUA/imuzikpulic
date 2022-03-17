import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Min,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as Relay from 'graphql-relay';
import { ClassType } from 'type-graphql';
import { TypeValue } from 'type-graphql/dist/decorators/types';

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field(() => Boolean, { nullable: true })
  hasNextPage?: boolean | null;
  @Field(() => Boolean, { nullable: true })
  hasPreviousPage?: boolean | null;
  @Field(() => String, { nullable: true })
  startCursor?: Relay.ConnectionCursor | null;
  @Field(() => String, { nullable: true })
  endCursor?: Relay.ConnectionCursor | null;
}

@ValidatorConstraint({ async: false })
class CannotUseWithout implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const required = args.constraints[0] as string;
    return object[required] !== undefined;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used without \`${args.constraints[0]}\`.`;
  }
}

@ValidatorConstraint({ async: false })
class CannotUseWith implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const result = args.constraints.every((propertyName) => {
      return object[propertyName] === undefined;
    });
    return result;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used with \`${args.constraints.join('` , `')}\`.`;
  }
}

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description: 'Paginate before opaque cursor',
  })
  @ValidateIf((o) => o.before !== undefined)
  @Validate(CannotUseWithout, ['last'])
  @Validate(CannotUseWith, ['after', 'first'])
  before?: Relay.ConnectionCursor;

  @Field(() => String, {
    nullable: true,
    description: 'Paginate after opaque cursor',
  })
  @ValidateIf((o) => o.after !== undefined)
  @Validate(CannotUseWithout, ['first'])
  @Validate(CannotUseWith, ['before', 'last'])
  after?: Relay.ConnectionCursor;

  @Field(() => Int, { nullable: true, description: 'Paginate first' })
  @ValidateIf((o) => o.first !== undefined)
  @Min(1)
  @Validate(CannotUseWith, ['before', 'last'])
  first?: number;

  @Field(() => Int, { nullable: true, description: 'Paginate last' })
  @ValidateIf((o) => o.last !== undefined)
  // Required `before`. This is a weird corner case.
  // We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
  // We'll just ignore it for now.
  @Validate(CannotUseWithout, ['before'])
  @Validate(CannotUseWith, ['after', 'first'])
  @Min(1)
  last?: number;
}

export function EdgeType<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class Edge implements Relay.Edge<TItem> {
    @Field(() => TItemClass)
    node!: TItem;

    @Field({ description: 'Used in `before` and `after` args' })
    cursor!: Relay.ConnectionCursor;
  }

  return Edge;
}

export function ConnectionType<TItem>(TItemClass: ClassType<TItem>, Edge: TypeValue) {
  @ObjectType({ isAbstract: true })
  abstract class Connection implements Relay.Connection<TItem> {
    @Field()
    pageInfo!: PageInfo;

    @Field(() => [Edge])
    edges!: Array<Relay.Edge<TItem>>;
  }

  return Connection;
}
