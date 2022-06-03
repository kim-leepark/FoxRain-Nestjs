export interface IJwtPayload {
  sub: string;
  email: string;
  id: number;
  type: 'access' | 'refresh';
}
