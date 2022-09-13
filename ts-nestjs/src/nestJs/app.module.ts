import { Module } from '@nestjs/common';
import { UsersController, OrgController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [UsersController, OrgController],
  providers: [AppService],
})
export class AppModule {}
