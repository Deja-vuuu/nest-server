import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validation.pipe';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix('apis/pag-admin-server/v1');
  // 设置全局参数校验
  app.useGlobalPipes(new ValidationPipe());
  //  拦截响应失败返回
  app.useGlobalFilters(new HttpExceptionFilter());
  // 拦截响应成功返回
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
