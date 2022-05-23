import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from 'src/presentation/user/user.controller';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [ConfigModule, UsecasesProxyDynamicModule.register()],
  controllers: [UserController],
})
export class ControllersModule {}
