import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 获取请求header token值
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: 'jwtContants.secret',
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    //payload：jwt-passport认证jwt通过后解码的结果
    return { username: payload.username, id: payload.sub };
  }
}
