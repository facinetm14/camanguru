import { userService } from "../../usecases/userService.js";

(async () => {
  const userId = sessionStorage.getItem('userId');
  const userInfosResp = await userService.getUserInfos(userId);
  if (userInfosResp.ok) {
    console.log({userInfosResp});
  }
  else {
    console.log('WHat ?');
  }
})();