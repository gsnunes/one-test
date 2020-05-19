import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class InitiativeInput {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;
}
