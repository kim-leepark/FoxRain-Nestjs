import { GetUserInfoPresenter } from 'src/presentation/user/user-info.presenter';
import { SignUpDto } from 'src/presentation/user/user.dto';

export interface UserRepository {
  findOne(email: string);
  singUp(request: SignUpDto): Promise<void>;
  userInfo(
    userId: number,
    page: number,
    size: number,
  ): Promise<GetUserInfoPresenter[]>;
}
