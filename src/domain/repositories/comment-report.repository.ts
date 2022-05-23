export interface CommentReportRepository {
  findOne(commentId: number, userId: number);
  commentReport(content: string, commentId: number, userId: number): Promise<void>;
}
