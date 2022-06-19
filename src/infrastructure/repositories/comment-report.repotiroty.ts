import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentReportM } from 'src/domain/model/comment-report';
import { CommentReportRepository } from 'src/domain/repositories/comment-report.repository';
import { Repository } from 'typeorm';
import { CommentReportTypeOrmEntity } from '../entities/comment-report.entity';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseCommentReportRepository implements CommentReportRepository {
  constructor(
    @InjectRepository(CommentReportTypeOrmEntity)
    private readonly commentReportEntityRepository: Repository<CommentReportTypeOrmEntity>,
    @InjectRepository(CommentTypeOrmEntity)
    private readonly commentEntityRepository: Repository<CommentTypeOrmEntity>,
    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async findOne(commentId: number) {
    return this.commentEntityRepository.findOne({ id: commentId });
  }

  async findComment(commentId: number, userId: number) {
    return await this.commentReportEntityRepository
      .createQueryBuilder('comment_report')
      .select()
      .where('comment_report.comment_id = :comment_id', { comment_id: commentId })
      .andWhere('comment_report.user_id = :user_id', { user_id: userId })
      .getOne();
  }

  async commentReport(content: string, commentId: number, userId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);
    const comment: CommentTypeOrmEntity = await this.commentEntityRepository.findOne(commentId);

    await this.commentReportEntityRepository.save({
      content,
      user,
      comment,
    });
  }

  async reportedCommentReasonsList(commentId: number): Promise<CommentReportM[]> {
    const reportedCommentReasons: any[] = await this.commentReportEntityRepository
      .createQueryBuilder('comment_report')
      .leftJoin('comment_report.comment', 'comment')
      .leftJoin('comment_report.user', 'user')
      .select('comment.id', 'commentId')
      .addSelect('comment_report.content', 'content')
      .addSelect('user.id', 'userId')
      .addSelect('user.name', 'name')
      .where('comment_report.comment_id = :comment_id', { comment_id: commentId })
      .getRawMany();

    return reportedCommentReasons.map((reportedCommentReason) => new CommentReportM(reportedCommentReason));
  }

  async reportedCommentList(page: number, size: number): Promise<CommentReportM[]> {
    const reportedCommentList: any[] = await this.commentReportEntityRepository
      .createQueryBuilder('comment_report')
      .leftJoin('comment_report.comment', 'comment')
      .select('comment.id', 'commentId')
      .addSelect('comment.content', 'content')
      .addSelect('COUNT(distinct comment.id)', 'reportedNum')
      .offset((page - 1) * size)
      .limit(size)
      .groupBy('comment_report.id')
      .getRawMany();

    return reportedCommentList.map((reportedComment) => new CommentReportM(reportedComment));
  }
}
