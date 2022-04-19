import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { normalize } from 'path';
import fs from 'fs-extra';
import OSS from 'ali-oss';

@Injectable()
export class ResourcesService {
  private readonly ossClient: any;
  private readonly ossConfig: any;
  private readonly uploadConfig: any;

  public constructor(private configService: ConfigService) {
    this.ossConfig = this.configService.get('ossConfig');
    this.uploadConfig = this.configService.get('uploadConfig');
    this.ossClient = new OSS(this.ossConfig);
  }

  /**
   * 上传到oss
   * @param files
   * @param userPath
   */
  async uploadOSS(files, userPath) {
    return await Promise.all(
      files?.files?.map(async (file, i) => {
        // 文件上传最终路径 二级文件夹 + workspace + 文件名
        const filePath = `${this.ossConfig.ossFolder}/${userPath}/${file.filename}`;
        const res = await this.ossClient.put(filePath, normalize(file.path));
        return {
          url: res.url,
          fileName: res.name,
        };
      }),
    ).catch((err) => {
      return err;
    });
  }

  /**
   * 文件列表
   */
  async list(userPath) {
    const res = await this.ossClient.listV2({
      prefix: `${this.ossConfig.ossFolder}/${userPath}`,
    });
    console.log('测试-----------');
    if (res?.objects) {
      return res?.objects;
    }
  }

  /**
   * 清空缓存文件列表
   */
  deleteTempFile() {
    const path = this.uploadConfig.tempFile;
    if (fs.existsSync(path)) {
      fs.emptyDir(path, (err) => {
        if (err) return console.error(err);
        console.log('removeSync success!');
      });
    }
  }
}
