import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from 'src/domain/repositories/post.repository';
import { Repository } from 'typeorm';
import { PostTypeOrmEntity } from '../entities/post.entity';

@Injectable()
export class DatabasePostRepository implements PostRepository {
  constructor(
    @InjectRepository(PostTypeOrmEntity)
    private readonly postEntityRepository: Repository<PostTypeOrmEntity>,
  ) {}

  findOne(postId: number) {
    return this.postEntityRepository.findOne({ id: postId });
  }
}
