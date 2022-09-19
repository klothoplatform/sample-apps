
import { Injectable } from '@nestjs/common';
import * as usersModel from "./users.model";
import { UserModel } from "./users.model";
import { InferAttributes, Model } from "sequelize";


@Injectable()
export class UsersService {
  async getUser(id: string): Promise<Model<InferAttributes<UserModel>> | null | undefined> {
    return usersModel.getUserById(id);
  }

  async findAllUsers() {
    return await usersModel.findAll();
  }

  async writeUser(user: UserModel) {
    await usersModel.writeUser(user);
  }
}
