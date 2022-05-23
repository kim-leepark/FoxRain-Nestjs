import { IException } from 'src/domain/exceptions/exceptions.interface';
import { UserRepository } from 'src/domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../../presentation/user/user.dto';

export class SignUpUsecase {
  constructor(private readonly userRepositoy: UserRepository, private readonly exceptionsService: IException) {}

  async execute(request: SignUpDto) {
    const user = await this.userRepositoy.findOne(request.email);

    if (user) this.exceptionsService.userAlreadyExistException();

    const hashPassword = await bcrypt.hash(request.password, 12);
    request.password = hashPassword;

    this.userRepositoy.singUp(request);
  }
}
