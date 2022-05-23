import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentReportM } from 'src/domain/model/comment-report';
import { CommentReportRepository } from 'src/domain/repositories/comment-report.repository';

export class ReportedCommentReasonsListUsecase {
  constructor(private readonly commentReportRepository: CommentReportRepository, private readonly exceptionService: IException) {}

  async execute(commentId: number): Promise<CommentReportM[]> {
    const commentList = await this.commentReportRepository.reportedCommentReasonsList(commentId);

    if (commentList.length === 0) throw this.exceptionService.reportedCommentReasonsNotFoundException();

    return commentList;
  }
}
