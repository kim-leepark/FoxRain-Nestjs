import { CommentM } from '../model/comment';

export interface CommentRepository {
  createComment(content: string, postId: number, userId: number): Promise<void>;
  findCommentList(postId: number, page: number, size: number): Promise<CommentM[]>;
}
