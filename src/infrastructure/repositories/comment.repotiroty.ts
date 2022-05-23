import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { Repository } from 'typeorm';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { PostTypeOrmEntity } from '../entities/post.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentTypeOrmEntity)
    private readonly commentEntityRepository: Repository<CommentTypeOrmEntity>,
    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
    @InjectRepository(PostTypeOrmEntity)
    private readonly postEntityRepository: Repository<PostTypeOrmEntity>,
  ) {}

  async createComment(
    content: string,
    postId: number,
    userId: number,
  ): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(
      userId,
    );
    const post: PostTypeOrmEntity = await this.postEntityRepository.findOne(
      postId,
    );

    await this.commentEntityRepository.save({
      content,
      post,
      user,
    });
  }
}
