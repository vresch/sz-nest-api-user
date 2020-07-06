export namespace IUser {
  export abstract class User {
    _id?: string;
    email: string;
    password: string;
    salt?: string;
    abstract validatePassword(password: string): boolean;
  }
}
