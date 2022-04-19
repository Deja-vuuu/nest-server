import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginEntity } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  /**
   * 校验用户名密码
   * @param username
   * @param password
   */
  validate(username: string, password: string): any {
    const user = this.usersService.findOne(username);
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  }
  /**
   * user login
   * @param loginParams
   */
  login(loginParams): LoginEntity {
    const { username } = loginParams;
    const user = this.usersService.findOne(username);
    return {
      access_token: 'Bearer ' + this.jwtService.sign(user),
      ...user,
    };
  }
}
