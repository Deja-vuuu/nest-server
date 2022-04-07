import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly userName: string | number;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsNumber({}, { message: '密码必须是 Number 类型' })
  readonly passWord: number;
}
