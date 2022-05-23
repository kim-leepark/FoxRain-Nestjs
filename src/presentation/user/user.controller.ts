import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { LoginUsecase } from 'src/usecase/user/login';
import { SignUpUsecase } from 'src/usecase/user/sign-up';
import { LoginDto, SignUpDto } from 'src/presentation/user/user.dto';
import { UserInfoUsecase } from 'src/usecase/user/user-info';
import { GetUserInfoPresenter } from './user-info.presenter';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(SignUpUsecase) private readonly signUpUsecase: SignUpUsecase,
    @Inject(LoginUsecase) private readonly loginUsecase: LoginUsecase,
    @Inject(UserInfoUsecase) private readonly userInfoUsecase: UserInfoUsecase,
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

  @Get('/:userId')
  userInfo(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<GetUserInfoPresenter[]> {
    return this.userInfoUsecase.execute(userId, page, size);
  }
}
