import { Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { CommentReportM } from 'src/domain/model/comment-report';
import { ReportedCommentListUsecase } from 'src/usecase/comment_report/reported-comment-list';

@Controller('/report')
export class CommnetReportController {
  constructor(
    @Inject(ReportedCommentListUsecase)
    private readonly reportedCommentListUsecase: ReportedCommentListUsecase,
  ) {}

  @Get('/comments')
  reportedCommentReasonsList(@Query('page', ParseIntPipe) page: number, @Query('size', ParseIntPipe) size: number): Promise<CommentReportM[]> {
    return this.reportedCommentListUsecase.execute(page, size);
  }
}
