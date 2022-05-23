import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CreateCommentUsecase } from 'src/usecase/comment/create-comment';
import { GetCommentListUsecase } from 'src/usecase/comment/get-comment-list';
import { LoginUsecase } from 'src/usecase/user/login';
import { SignUpUsecase } from 'src/usecase/user/sign-up';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
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
      ],
      exports: [SignUpUsecase, LoginUsecase, UserInfoUsecase, CreateCommentUsecase, GetCommentListUsecase],
    };
  }
}
