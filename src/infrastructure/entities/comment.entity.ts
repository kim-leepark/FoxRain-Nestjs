import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class CommentTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
