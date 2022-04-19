import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ResourcesService } from '../resources/resources.service';

@Injectable()
export class TaskService {
  constructor(private resourcesService: ResourcesService) {}
  /**
   * 每月清理oss临时文件
   */
  // @Cron('10 * * * * *')
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  deleteTempFile() {
    this.resourcesService.deleteTempFile();
  }
}
