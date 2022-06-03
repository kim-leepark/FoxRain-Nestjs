import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Query, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { CommentM } from 'src/domain/model/comment';
import { CommentReportM } from 'src/domain/model/comment-report';
import { CommentReportUsecase } from 'src/usecase/comment/comment-report';
import { CreateCommentUsecase } from 'src/usecase/comment/create-comment';
import { GetCommentListUsecase } from 'src/usecase/comment/get-comment-list';
import { ReportedCommentReasonsListUsecase } from 'src/usecase/comment/reported-comment-reasons-list';

@Controller({ path: '/comment', scope: Scope.REQUEST })
export class CommnetController {
  constructor(
    @Inject(CreateCommentUsecase)
    private readonly createCommentUsecase: CreateCommentUsecase,
    @Inject(GetCommentListUsecase)
    private readonly getCommentListUsecase: GetCommentListUsecase,
    @Inject(CommentReportUsecase)
    private readonly commentReportUsecase: CommentReportUsecase,
    @Inject(ReportedCommentReasonsListUsecase)
    private readonly reportedCommentReasonsListUsecase: ReportedCommentReasonsListUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/:postId')
  @HttpCode(HttpStatus.CREATED)
  createComment(@Body('content') content: string, @Param('postId', ParseIntPipe) postId: number) {
    return this.createCommentUsecase.execute(content, postId, this.request.user.id);
  }

  @Get('/:postId')
  commentList(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<CommentM[]> {
    return this.getCommentListUsecase.execute(postId, page, size);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:commentId/report')
  @HttpCode(HttpStatus.CREATED)
  commentReport(@Body('content') content: string, @Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentReportUsecase.execute(content, commentId, this.request.user.id);
  }

  @Get('/:commentId/report/reasons')
  reportedCommentReasonsList(@Param('commentId', ParseIntPipe) commentId: number): Promise<CommentReportM[]> {
    return this.reportedCommentReasonsListUsecase.execute(commentId);
  }
}
