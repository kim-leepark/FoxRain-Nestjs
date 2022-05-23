import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { LoginUsecase } from 'src/usecase/user/login';
import { SignUpUsecase } from 'src/usecase/user/sign-up';
import { LoginDto, SignUpDto } from 'src/presentation/user/user.dto';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(SignUpUsecase) private readonly signUpUsecase: SignUpUsecase,
    @Inject(LoginUsecase) private readonly loginUsecase: LoginUsecase,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() request: SignUpDto) {
    await this.signUpUsecase.execute(request);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginDto) {
    return await this.loginUsecase.execute(request);
  }
}
