import { Expose } from 'class-transformer';

export class Comment {
  id: number;
  content: string;
  created_at: Date;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'post_id' })
  postId: number;
}
