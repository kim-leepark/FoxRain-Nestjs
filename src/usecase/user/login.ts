import { IException } from 'src/domain/exceptions/exceptions.interface';
import { UserM } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../presentation/user/user.dto';

export class LoginUsecase {
  constructor(
    private readonly userRepositoy: UserRepository,
    private readonly exceptionsService: IException,
    private readonly jwtService: JwtService,
  ) {}

  async execute(request: LoginDto) {
    const user: UserM = await this.userRepositoy.findOne(request.email);
    const confirmPassword: boolean = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!user) this.exceptionsService.notFoundUserException();
    if (!confirmPassword) this.exceptionsService.notConfirmPasswordException();

    const payload = { userId: user.id, type: 'access' };

    return { access_token: this.jwtService.sign(payload) };
  }
}
