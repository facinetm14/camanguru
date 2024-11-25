import { userService } from "../../usecases/userService.js";
import userStore from "../../scripts/userStore.js";

(async () => {
  const userId = sessionStorage.getItem("userId");

  const userInfosResp = await userService.getUserInfos(userId);

  if (userInfosResp.ok) {
    const userInfosRespData = await userInfosResp.json();
    userStore.setState({ user: userInfosRespData });
  }
  const user = userStore.getState().user;

  const profileDropdownMenu = document.querySelector("#profile-dropdownMenu");
  const usernameLabel = document.querySelector("#username-label");
  usernameLabel.textContent = user.username;
  usernameLabel.addEventListener("click", (_event) => {
    const previous = profileDropdownMenu.style.display;
    profileDropdownMenu.style.display = previous === "block" ? "none" : "block";
  });


  const profileNameLabel = document.querySelector("#profile-name-label");
  profileNameLabel.textContent = user.username;

  const profileEmailLabel = document.querySelector("#profile-email-label");
  profileEmailLabel.textContent = user.email;

  const profileAdressLabel = document.querySelector("#profile-adress-label");
  profileAdressLabel.textContent = user.adress;


})();
