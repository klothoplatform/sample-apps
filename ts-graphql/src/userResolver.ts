import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User, UserInput } from "./user";

const userStore = new Map<string, User>();

@Resolver(of => User)
export class UserResolver {

  @Query(returns => User, { nullable: true })
  async getUser(@Arg('userInput') { name }: UserInput): Promise<User> {
    return await userStore.get(name);
  }

  @Mutation(returns => User)
  async addUser(@Arg('userInput') { name }: UserInput): Promise<User> {
    const user = {
      id: Math.floor(Math.random() * 100),
      name,
    }

    await userStore.set(user.name, user)
    return user;
  }
}
