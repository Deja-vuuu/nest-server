import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
    this.authService = authService;
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validate(username, password);
    if (user) return user;
    else throw new UnauthorizedException('用户名密码错误');
  }
}
