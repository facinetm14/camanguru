export interface IRegistrationRequest {
  create(
    firstname: string,
    lastname: string,
    email: string,
    plainPassword: string,
  ): RegistrationRequest;

  getFirstname(): string;

  getLastname(): string;

  getEmail(): string;

  getPassword(): string;
}

export class RegistrationRequest implements IRegistrationRequest {
  private firstname: string;
  private lastname: string;
  private email: string;
  private plainPassword: string;

  private constructor(
    firstname: string,
    lastname: string,
    email: string,
    plainPassword: string,
  ) {}

  public create(
    firstname: string,
    lastname: string,
    email: string,
    plainPassword: string,
  ) {
    // validation des données de la requête
    return new RegistrationRequest(
      firstname,
      lastname,
      email,
      plainPassword
    );
  }

  getFirstname(): string {
    return this.firstname;
  }

  getLastname(): string {
    return this.lastname;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.plainPassword;
  }
}