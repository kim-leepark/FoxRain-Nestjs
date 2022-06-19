import { CommentReportM } from '../model/comment-report';

export interface CommentReportRepository {
  findOne(commentId: number);
  findComment(commentId: number, userId: number);
  commentReport(content: string, commentId: number, userId: number): Promise<void>;
  reportedCommentReasonsList(commentId: number): Promise<CommentReportM[]>;
  reportedCommentList(page: number, size: number): Promise<CommentReportM[]>;
}
