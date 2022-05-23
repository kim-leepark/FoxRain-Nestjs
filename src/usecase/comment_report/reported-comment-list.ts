import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentReportM } from 'src/domain/model/comment-report';
import { CommentReportRepository } from 'src/domain/repositories/comment-report.repository';

export class ReportedCommentListUsecase {
  constructor(private readonly commentReportRepository: CommentReportRepository, private readonly exceptionService: IException) {}

  async execute(page: number, size: number): Promise<CommentReportM[]> {
    const reportedCommentList = await this.commentReportRepository.reportedCommentList(page, size);

    if (reportedCommentList.length === 0) throw this.exceptionService.reportedCommentNotFoundException();

    return reportedCommentList;
  }
}
