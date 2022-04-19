import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginInfoDTO } from './auth.dto';
import { LoginEntity } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginParams: LoginInfoDTO): Promise<LoginEntity> {
    return this.authService.login(loginParams);
  }
}