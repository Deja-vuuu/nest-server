import { Controller, Get, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { Express } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ResourcesService } from './resources.service';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { join } from 'path';
import { randomUUID } from 'crypto';

@Controller('resources')
export class ResourcesController {
  private readonly uploadConfig: any;
  constructor(private readonly resourcesService: ResourcesService, private readonly configService: ConfigService) {
    this.uploadConfig = this.configService.get('uploadConfig');
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'files',
          maxCount: 10,
        },
      ],
      {
        storage: diskStorage({
          destination: join(__dirname, '../../../', '/public/temp-upload-oos'),
          filename: (req, file: any, cb) => {
            const originalFileSplit = file.originalname.split('.');
            const originalFileName = originalFileSplit[0];
            const fileSuffix = originalFileSplit[1];
            const filename = `${originalFileName}_${randomUUID()}.${fileSuffix}`;
            return cb(null, filename);
          },
        }),
      },
    ),
  )
  async uploadFile(@UploadedFiles() files: Express.Multer.File[], @Request() req: any) {
    const userPath = req?.user?.workspace || 'boxonline';
    return await this.resourcesService.uploadOSS(files, userPath);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async list(@Request() req: any) {
    const userPath = req?.user?.workspace || 'boxonline';
    return await this.resourcesService.list(userPath);
  }
}
