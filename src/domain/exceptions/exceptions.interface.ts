export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  recordNotFoundException(): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  UnauthorizedException(data?: IFormatExceptionMessage): void;
  userAlreadyExistException(): void;
  expiredTokenException(): void;
  unauthorizedException(data?: IFormatExceptionMessage): void;
  notFoundUserException(): void;
  notConfirmPasswordException(): void;
}
