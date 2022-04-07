import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { BadRequestException } from '@nestjs/common';
import { RegisterInfoDTO } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body() RegisterInfoDTO: RegisterInfoDTO): string {
    throw new BadRequestException(`1313`);
  }

  @Get('a')
  getHello1(): string {
    return this.appService.getHello2();
  }
}
