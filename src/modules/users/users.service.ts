import { Injectable } from '@nestjs/common';
import { readFile } from 'src/utils';

const userFilePath = process.cwd() + '/static/db/users.json';
@Injectable()
export class UsersService {
  /**
   * 通过用户名
   * @returns {*}
   * @param username
   */
  findOne(username) {
    const usersList = readFile(userFilePath);
    if (usersList) {
      const user = usersList.find((user) => user.username === username);
      if (user) return user;
      else return null;
    } else {
      return null;
    }
  }
}
