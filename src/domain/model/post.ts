import { Expose } from 'class-transformer';

export class PostM {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  name: string;

  @Expose({ name: 'user_id' })
  userId: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
