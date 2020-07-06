export namespace ISession {
  export class Session {
    userId: string;
    accessToken: string;
    createdAt: Date;
    expireAt: Date;
  }

  export class Token {
    accessToken: string;
  }

  export class TokenPayload {
    email: string;
    iat: number;
  }
}
