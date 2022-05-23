import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentReportTypeOrmEntity } from './comment-report.entity';
import { CommentTypeOrmEntity } from './comment.entity';
import { PostTypeOrmEntity } from './post.entity';

@Entity('user')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => CommentTypeOrmEntity, (comment) => comment.user)
  comments: CommentTypeOrmEntity[];

  @OneToMany(
    () => CommentReportTypeOrmEntity,
    (comment_report) => comment_report.user,
  )
  comment_report: CommentReportTypeOrmEntity[];

  @OneToMany(() => PostTypeOrmEntity, (post) => post.user)
  posts: PostTypeOrmEntity[];
}
