import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { UserEntity } from '../users/user.entity';
// import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from './token.entity';

@Injectable()
export class AuthService {
  private readonly userService: UsersService;
  // private readonly jwtService: JwtService;

  /**
   * validate user name and password
   * @param username
   * @param password
   */
  async validate(username: string, password: string): Promise<any> {
    console.log('username', username, password);
    const user = await this.userService.find(username);
    // 注：实际中的密码处理应通过加密措施
    if (user && user.password === password) {
      const { password, ...userInfo } = user;
      return userInfo;
    } else {
      return null;
    }
  }

  /**
   * user login
   * @param user
   */
  async login(user: any): Promise<TokenEntity> {
    const { id, username } = user;
    return {
      token: '123',
    };
  }
}
