import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentReportRepository } from 'src/domain/repositories/comment-report.repository';
import { Repository } from 'typeorm';
import { CommentReportTypeOrmEntity } from '../entities/comment-report.entity';

@Injectable()
export class DatabaseCommentReportRepository
  implements CommentReportRepository
{
  constructor(
    @InjectRepository(CommentReportTypeOrmEntity)
    private readonly commentReportTypeOrmEntity: Repository<CommentReportTypeOrmEntity>,
  ) {}
}
