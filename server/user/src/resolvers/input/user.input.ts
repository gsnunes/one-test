import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UserInput {
  @Field()
  readonly email: string;

  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;
}

@InputType()
export class DeleteUserInput {
  @Field()
  readonly id: number;
}
