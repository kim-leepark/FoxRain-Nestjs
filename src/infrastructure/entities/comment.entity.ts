import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentReportTypeOrmEntity } from './comment-report.entity';
import { PostTypeOrmEntity } from './post.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('comment')
export class CommentTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;

  @ManyToOne(() => PostTypeOrmEntity, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: PostTypeOrmEntity;

  @OneToMany(() => CommentReportTypeOrmEntity, (comment_report) => comment_report.comment)
  comment_report: CommentReportTypeOrmEntity[];
}
