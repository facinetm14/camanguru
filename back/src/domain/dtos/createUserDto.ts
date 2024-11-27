export type CreateUserDto = {
  id?: string;
  email: string;
  adress: string;
  username: string;
  passwd: string;
  createdAt?: Date;
  updatedAt?: Date;
};
