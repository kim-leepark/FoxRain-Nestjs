import { Expose } from 'class-transformer';

export class CommentM {
  id: number;
  content: string;
  created_at: Date;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'post_id' })
  postId: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
