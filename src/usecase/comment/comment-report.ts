import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentReportRepository } from 'src/domain/repositories/comment-report.repository';

export class CommentReportUsecase {
  constructor(private readonly commentReportRepository: CommentReportRepository, private readonly exceptionsService: IException) {}

  async execute(content: string, commentId: number, userId: number) {
    const reportedComment = await this.commentReportRepository.findComment(commentId, userId);
    const comment = await this.commentReportRepository.findOne(commentId);

    if (reportedComment) this.exceptionsService.alreadyReportedCommentException();
    if (!comment) this.exceptionsService.commentNotFoundException();

    this.commentReportRepository.commentReport(content, commentId, userId);
  }
}
