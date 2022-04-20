import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IException,
  IFormatExceptionMessage,
} from '../../domain/exceptions/exceptions.interface';

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
  recordNotFoundException(): void {
    throw new NotFoundException('Record not found exception');
  }
  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  userAlreadyExistException(): void {
    throw new BadRequestException('User already exist exception');
  }
  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  expiredTokenException(): void {
    throw new UnauthorizedException('Token expired exception');
  }
  notFoundUserException(): void {
    throw new NotFoundException('User not found exception');
  }
  notConfirmPasswordException(): void {
    throw new ForbiddenException('Not confirm password exception');
  }
}
