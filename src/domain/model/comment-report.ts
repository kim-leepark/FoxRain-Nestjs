import { Expose } from 'class-transformer';

export class CommentReport {
  id: number;
  content: string;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'comment_id' })
  commentId: number;
}
