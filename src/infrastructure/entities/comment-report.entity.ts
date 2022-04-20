import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentTypeOrmEntity } from './comment.entity';
import { PostTypeOrmEntity } from './post.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('comment_report')
export class CommentReportTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  content: string;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.comment_report)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;

  @ManyToOne(() => CommentTypeOrmEntity, (comment) => comment.comment_report)
  @JoinColumn({ name: 'comment_id' })
  comment: PostTypeOrmEntity;
}
