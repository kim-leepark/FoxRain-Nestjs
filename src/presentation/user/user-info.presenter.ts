import { Expose } from 'class-transformer';

export class GetUserInfoPresenter {
  name: string;

  @Expose({ name: 'post_id' })
  postId: number;

  title: string;

  content: string;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
