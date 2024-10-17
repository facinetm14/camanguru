export type CreateUserDto = {
  id?: string;
  email: string;
  address: string;
  username: string;
  passwd: string;
  createdAt?: Date;
  updatedAt?: Date;
};
