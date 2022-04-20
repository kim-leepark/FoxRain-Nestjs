import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserTypeOrmEntity])],
  providers: [],
  exports: [],
})
export class RepositoriesModule {}
