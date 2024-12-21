export class Session {
  private readonly _id: string;

  private constructor() {}

  public static create(): Session {
    return new Session();
  }
}
