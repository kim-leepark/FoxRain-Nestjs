import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommnetController } from 'src/presentation/comment/comment.controller';
import { CommnetReportController } from 'src/presentation/comment_report/comment-report.controller';
import { UserController } from 'src/presentation/user/user.controller';
import { UsecasesProxyDynamicModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [ConfigModule, UsecasesProxyDynamicModule.register()],
  controllers: [UserController, CommnetController, CommnetReportController],
})
export class ControllersModule {}
