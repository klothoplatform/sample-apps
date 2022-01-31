import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User, UserInput } from "./user";


@Resolver(of => User)
export class UserResolver {
    private user: User[] = []

  @Query(returns => [User], { nullable: true })
  async getUser(): Promise<User[]> {
    return await this.user;
  }

  @Mutation(returns => User)
  async addUser(@Arg('userInput') {name}: UserInput): Promise<User> {
    const user = {
      id: Math.random(),
      name,
    }

    await this.user.push(user)
    return user;
  }
}
