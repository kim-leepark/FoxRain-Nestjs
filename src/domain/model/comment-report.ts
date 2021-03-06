import { Expose } from 'class-transformer';

export class CommentReportM {
  id: number;
  content: string;
  name: string;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'comment_id' })
  commentId: number;

  @Expose({ name: 'reported_num' })
  reportedNum: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
