import { Injectable } from '@nestjs/common';
import { readFile } from 'src/utils';

const userFilePath = process.cwd() + '/static/db/users.json';
@Injectable()
export class UsersService {
  /**
   * 通过用户名
   * @param name
   * @returns {*}
   */
  find(name) {
    const data = readFile(userFilePath);
    if (data) {
      return data.find((value) => {
        return value.userName === name;
      });
    }
  }
}
