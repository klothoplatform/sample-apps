import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  name: String;

}


@InputType()
export class UserInput implements Partial<User> {
  @Field()
  name: string;

}