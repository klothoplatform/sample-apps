/**
 * @klotho::execution_unit {
 *   id = "nest-api"
 * }
 */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(" GET users ")
    return this.appService.getHello();
  }
}


@Controller('org')
export class OrgController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(" GET ORG ")
    return this.appService.getHello();
  }

  @Post()
  putOrg(@Body() org: string): string {
    console.log(org)
    console.log(" POST ORG ")
    return this.appService.getHello();
  }

  @Get(':id')
  getOrg(): string {
    console.log(" GET ORG with id ")
    return this.appService.getHello();
  }
}
