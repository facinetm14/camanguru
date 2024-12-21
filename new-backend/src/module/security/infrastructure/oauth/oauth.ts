import { UserProfileData } from "../../domain/oauth/oauth"

export abstract class OAuth {
  getAccessToken(code: string): Promise<string> {
    return Promise.resolve('access_token')
  }

  getUserProfileData(accessToken: string): Promise<UserProfileData> {
    return Promise.resolve({
      firstname: '',
      lastname: '',
      email: ''
    })
  }
}