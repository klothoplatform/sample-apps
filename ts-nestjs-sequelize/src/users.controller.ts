/* @klotho::execution_unit {
 *   id = "UsersAPI"
 * }
 */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.findAllUsers()
  }

  @Post()
  async postUser(@Body() user: UserModel) {
    return await this.usersService.writeUser(user)
  }
  
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }
}
