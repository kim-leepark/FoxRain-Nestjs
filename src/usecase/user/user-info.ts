import { IException } from 'src/domain/exceptions/exceptions.interface';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { GetUserInfoPresenter } from 'src/presentation/user/user-info.presenter';

export class UserInfoUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(
    userId: number,
    page: number,
    size: number,
  ): Promise<GetUserInfoPresenter[]> {
    const userInfo = await this.userRepository.userInfo(userId, page, size);

    if (userInfo.length === 0) this.exceptionService.userNotFoundException();

    return userInfo;
  }
}
