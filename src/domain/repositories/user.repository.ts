import { SignUpDto } from 'src/presentation/user/user.dto';

export interface UserRepository {
  findOne(email: string);
  singUp(request: SignUpDto): Promise<void>;
}
