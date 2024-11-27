export type CreateUserDto = {
  id?: string;
  email: string;
  adress: string;
  username: string;
  firstName: string;
  lastName: string;
  passwd: string;
  createdAt?: Date;
  updatedAt?: Date;
};
