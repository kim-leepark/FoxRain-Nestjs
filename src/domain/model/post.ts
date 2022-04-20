import { Expose } from 'class-transformer';

export class Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;

  @Expose({ name: 'user_id' })
  userId: number;
}
