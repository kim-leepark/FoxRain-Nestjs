import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { CommentReportTypeOrmEntity } from '../entities/comment-report.entity';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { PostTypeOrmEntity } from '../entities/post.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { DatabaseCommentReportRepository } from './comment-report.repotiroty';
import { DatabaseCommentRepository } from './comment.repotiroty';
import { DatabasePostRepository } from './post.repotiroty';
import { DatabaseUserRepository } from './user.repotiroty';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      UserTypeOrmEntity,
      CommentTypeOrmEntity,
      CommentReportTypeOrmEntity,
      PostTypeOrmEntity,
    ]),
  ],
  providers: [
    DatabaseCommentReportRepository,
    DatabaseCommentRepository,
    DatabasePostRepository,
    DatabaseUserRepository,
  ],
  exports: [
    DatabaseCommentReportRepository,
    DatabaseCommentRepository,
    DatabasePostRepository,
    DatabaseUserRepository,
  ],
})
export class RepositoriesModule {}
