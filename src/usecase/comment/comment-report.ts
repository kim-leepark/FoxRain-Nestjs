import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentReportRepository } from 'src/domain/repositories/comment-report.repository';

export class CommentReportUsecase {
  constructor(private readonly commentReportRepository: CommentReportRepository, private readonly exceptionsService: IException) {}

  async execute(content: string, commentId: number, userId: number) {
    const reportedComment = await this.commentReportRepository.findOne(commentId, userId);

    if (reportedComment) this.exceptionsService.alreadyReportedCommentException();

    this.commentReportRepository.commentReport(content, commentId, userId);
  }
}
