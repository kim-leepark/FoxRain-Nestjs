import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostM } from 'src/domain/model/post';
import { UserM } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { GetUserInfoPresenter } from 'src/presentation/user/user-info.presenter';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
  ) {}

  findOne(email: string) {
    return this.userEntityRepository.findOne({ email: email });
  }

  async singUp(request: UserM): Promise<void> {
    const user = this.userEntityRepository.create(request);

    this.userEntityRepository.save(user);
  }

  async userInfo(
    userId: number,
    page: number,
    size: number,
  ): Promise<GetUserInfoPresenter[]> {
    const userInfo: any[] = await this.userEntityRepository
      .createQueryBuilder('user')
      .leftJoin('user.posts', 'post')
      .select('user.name', 'name')
      .addSelect('post.id', 'postId')
      .addSelect('post.title', 'title')
      .addSelect('post.content', 'content')
      .where('user.id = :id', { id: userId })
      .offset((page - 1) * size)
      .limit(size)
      .getRawMany();

    return userInfo.map((user) => new GetUserInfoPresenter(user));
  }
}
