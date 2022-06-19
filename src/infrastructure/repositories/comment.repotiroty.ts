import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentM } from 'src/domain/model/comment';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { Repository } from 'typeorm';
import { CommentReportTypeOrmEntity } from '../entities/comment-report.entity';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { PostTypeOrmEntity } from '../entities/post.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentTypeOrmEntity)
    private readonly commentEntityRepository: Repository<CommentTypeOrmEntity>,
    @InjectRepository(CommentReportTypeOrmEntity)
    private readonly commentReportEntityRepository: Repository<CommentReportTypeOrmEntity>,
    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
    @InjectRepository(PostTypeOrmEntity)
    private readonly postEntityRepository: Repository<PostTypeOrmEntity>,
  ) {}

  async createComment(content: string, postId: number, userId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);
    const post: PostTypeOrmEntity = await this.postEntityRepository.findOne(postId);

    await this.commentEntityRepository.save({
      content,
      post,
      user,
    });
  }

  async findCommentList(postId: number, page: number, size: number): Promise<CommentM[]> {
    const comments: any[] = await this.commentEntityRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.post', 'post')
      .leftJoin('comment.comment_report', 'commentReport')
      .select('comment.id', 'id')
      .addSelect('comment.content', 'content')
      .addSelect('SUBSTR(comment.created_at, 1, 10)', 'createdAt')
      .addSelect('commentReport.id', 'reportedComment')
      .offset((page - 1) * size)
      .limit(size)
      .where('post.id = :id', { id: postId })
      .orderBy('comment.created_at', 'DESC')
      .groupBy('comment.id')
      .getRawMany();

    return Promise.all(
      comments.map(async (comment) => {
        comment.reportedComment = comment.reportedComment != null ? true : false;
        return new CommentM(comment);
      }),
    );
  }
}
