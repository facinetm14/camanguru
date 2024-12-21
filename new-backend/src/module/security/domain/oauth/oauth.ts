export interface UserProfileData {
  firstname: string;
  lastname: string;
  email: string;
}

export interface IOAuth {
  getAccessToken(code: string): Promise<string>
  getUserProfileData(accessToken: string): Promise<UserProfileData>
}
