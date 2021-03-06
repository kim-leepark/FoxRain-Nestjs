import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CommentReportUsecase } from 'src/usecase/comment/comment-report';
import { CreateCommentUsecase } from 'src/usecase/comment/create-comment';
import { GetCommentListUsecase } from 'src/usecase/comment/get-comment-list';
import { ReportedCommentReasonsListUsecase } from 'src/usecase/comment/reported-comment-reasons-list';
import { ReportedCommentListUsecase } from 'src/usecase/comment_report/reported-comment-list';
import { LoginUsecase } from 'src/usecase/user/login';
import { SignUpUsecase } from 'src/usecase/user/sign-up';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseCommentReportRepository } from '../repositories/comment-report.repotiroty';
import { DatabaseCommentRepository } from '../repositories/comment.repotiroty';
import { DatabasePostRepository } from '../repositories/post.repotiroty';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repotiroty';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
})
export class UsecasesProxyDynamicModule {
  static register(): DynamicModule {
    return {
      module: UsecasesProxyDynamicModule,
      providers: [
        {
          inject: [DatabaseUserRepository, ExceptionsService],
          provide: SignUpUsecase,
          useFactory: (databaseUserRepository: DatabaseUserRepository, exceptionsService: ExceptionsService) =>
            new SignUpUsecase(databaseUserRepository, exceptionsService),
        },
        {
          inject: [DatabaseUserRepository, ExceptionsService, JwtService],
          provide: LoginUsecase,
          useFactory: (databaseUserRepository: DatabaseUserRepository, exceptionsService: ExceptionsService, jwtService: JwtService) =>
            new LoginUsecase(databaseUserRepository, exceptionsService, jwtService),
        },
        {
          inject: [DatabaseUserRepository, ExceptionsService],
          provide: UserInfoUsecase,
          useFactory: (databaseUserRepository: DatabaseUserRepository, exceptionsService: ExceptionsService) =>
            new UserInfoUsecase(databaseUserRepository, exceptionsService),
        },
        {
          inject: [DatabasePostRepository, DatabaseCommentRepository, ExceptionsService],
          provide: CreateCommentUsecase,
          useFactory: (
            databasePostRepository: DatabasePostRepository,
            databaseCommentRepository: DatabaseCommentRepository,
            exceptionsService: ExceptionsService,
          ) => new CreateCommentUsecase(databasePostRepository, databaseCommentRepository, exceptionsService),
        },
        {
          inject: [DatabaseCommentRepository, ExceptionsService],
          provide: GetCommentListUsecase,
          useFactory: (databaseCommentRepository: DatabaseCommentRepository, exceptionsService: ExceptionsService) =>
            new GetCommentListUsecase(databaseCommentRepository, exceptionsService),
        },
        {
          inject: [DatabaseCommentReportRepository, ExceptionsService],
          provide: CommentReportUsecase,
          useFactory: (databaseCommentReportRepository: DatabaseCommentReportRepository, exceptionsService: ExceptionsService) =>
            new CommentReportUsecase(databaseCommentReportRepository, exceptionsService),
        },
        {
          inject: [DatabaseCommentReportRepository, ExceptionsService],
          provide: ReportedCommentReasonsListUsecase,
          useFactory: (databaseCommentReportRepository: DatabaseCommentReportRepository, exceptionsService: ExceptionsService) =>
            new ReportedCommentReasonsListUsecase(databaseCommentReportRepository, exceptionsService),
        },
        {
          inject: [DatabaseCommentReportRepository, ExceptionsService],
          provide: ReportedCommentListUsecase,
          useFactory: (databaseCommentReportRepository: DatabaseCommentReportRepository, exceptionsService: ExceptionsService) =>
            new ReportedCommentListUsecase(databaseCommentReportRepository, exceptionsService),
        },
      ],
      exports: [
        SignUpUsecase,
        LoginUsecase,
        UserInfoUsecase,
        CreateCommentUsecase,
        GetCommentListUsecase,
        CommentReportUsecase,
        ReportedCommentReasonsListUsecase,
        ReportedCommentListUsecase,
      ],
    };
  }
}
