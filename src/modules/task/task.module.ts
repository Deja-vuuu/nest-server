import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ResourcesService } from '../resources/resources.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [TaskController],
  providers: [TaskService, ResourcesService],
  imports: [ScheduleModule.forRoot()],
})
export class TaskModule {}
