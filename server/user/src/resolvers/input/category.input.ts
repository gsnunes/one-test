import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CategoryInput {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;
}
