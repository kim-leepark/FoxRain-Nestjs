import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { CreateCommentUsecase } from 'src/usecase/comment/create-comment';

@Controller({ path: '/comment', scope: Scope.REQUEST })
export class CommnetController {
  constructor(
    @Inject(CreateCommentUsecase)
    private readonly createCommentUsecase: CreateCommentUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/:postId')
  @HttpCode(HttpStatus.CREATED)
  createComment(
    @Body('content') content: string,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.createCommentUsecase.execute(
      content,
      postId,
      this.request.user.sub,
    );
  }
}
