export interface CommentRepository {
  createComment(content: string, postId: number, userId: number): Promise<void>;
}
