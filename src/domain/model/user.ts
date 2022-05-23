export class UserM {
  id: number;
  email: string;
  name: string;
  password: string;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
