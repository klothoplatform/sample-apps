import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User, UserInput } from "./user";


@Resolver(of => User)
export class UserResolver {
  private userStore = new Map<string, User>();

  @Query(returns => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    return await Array.from(this.userStore.values());
  }

  @Query(returns => User, { nullable: true })
  async getUser(@Arg('userInput') { name }: UserInput): Promise<User> {
    return await this.userStore.get(name);
  }

  @Mutation(returns => User)
  async addUser(@Arg('userInput') { name }: UserInput): Promise<User> {
    const user = {
      id: Math.floor(Math.random()*100),
      name,
    }

    await this.userStore.set(user.name, user)
    return user;
  }
}
