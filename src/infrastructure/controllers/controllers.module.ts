import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [ConfigModule, UsecasesProxyDynamicModule.register()],
  controllers: [],
})
export class ControllersModule {}
