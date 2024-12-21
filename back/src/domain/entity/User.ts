export enum UserStatus {
  UNVERIFIED = "unverified",
  VERIFIED = "verified",
}

export enum UserSessionStatus {
  VALID = "valid",
  INVALID = "invalid",
}

export enum UserUniqKeys {
  VALIDATION_TOKEN = "validation_token",
  ID = "id",
  EMAIL = "email",
  USER_NAME = "username",
}

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