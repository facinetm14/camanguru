export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  adress: string;
  username: string;
  passwd: string;
  createdAt: Date;
  updatedAt: Date;
  salt: string;
  status: string;
};

export type UserWithNoPassword = Omit<User, 'passwd'>;