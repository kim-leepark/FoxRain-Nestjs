import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
