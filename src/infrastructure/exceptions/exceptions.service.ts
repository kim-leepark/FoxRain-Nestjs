import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IException, IFormatExceptionMessage } from '../../domain/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  expiredTokenException(): void {
    throw new UnauthorizedException('Token expired exception');
  }
  userNotFoundException(): void {
    throw new NotFoundException('User not found exception');
  }
  postNotFoundException(): void {
    throw new NotFoundException('Post not found exception');
  }
  notConfirmPasswordException(): void {
    throw new ForbiddenException('Not confirm password exception');
  }
  userAlreadyExistException(): void {
    throw new BadRequestException('User already exist exception');
  }
  commentNotFoundException(): void {
    throw new NotFoundException('Comment not found exception');
  }
  alreadyReportedCommentException(): void {
    throw new BadRequestException('Already reported comment exception');
  }
  reportedCommentReasonsNotFoundException(): void {
    throw new NotFoundException('Reported comment reasons not found exception');
  }
  reportedCommentNotFoundException(): void {
    throw new NotFoundException('Reported comment not found exception');
  }
}
