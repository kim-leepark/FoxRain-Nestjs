import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentM } from 'src/domain/model/comment';
import { CommentRepository } from 'src/domain/repositories/comment.repository';

export class GetCommentListUsecase {
  constructor(private readonly commentRepository: CommentRepository, private readonly exceptionService: IException) {}

  async execute(postId: number, page: number, size: number): Promise<CommentM[]> {
    const commentList = await this.commentRepository.findCommentList(postId, page, size);

    if (commentList.length === 0) throw this.exceptionService.commentNotFoundException();

    return commentList;
  }
}
