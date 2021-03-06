import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentTypeOrmEntity } from './comment.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('post')
export class PostTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;

  @OneToMany(() => CommentTypeOrmEntity, (comment) => comment.post)
  comments: CommentTypeOrmEntity[];
}
