import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ResourcesController],
  providers: [ResourcesService, UsersService],
})
export class ResourcesModule {}
