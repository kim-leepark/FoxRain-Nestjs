import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { PostRepository } from 'src/domain/repositories/post.repository';

export class CreateCommentUsecase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(content: string, postId: number, userId: number) {
    const post = await this.postRepository.findOne(postId);

    if (!post) this.exceptionsService.postNotFoundException();

    this.commentRepository.createComment(content, postId, userId);
  }
}
