export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  UnauthorizedException(data?: IFormatExceptionMessage): void;
  expiredTokenException(): void;
  unauthorizedException(data?: IFormatExceptionMessage): void;
  notFoundUserException(): void;
  notConfirmPasswordException(): void;
  userAlreadyExistException(): void;
}
