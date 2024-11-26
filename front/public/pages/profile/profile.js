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

  // selfie
  const addImageBtn = document.querySelector("#btn-add-image");
  const selfieBlock = document.querySelector("#block-selfie");
  const screenZone = document.querySelector("#canvas");
  const video = document.querySelector("#video");
  const context = canvas.getContext("2d");
  let stream;

  addImageBtn.addEventListener("click", showSelfieBlock);

  async function showSelfieBlock(_event) {
    selfieBlock.style.display = "block";

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      captureSelfieButton.disabled = false;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  }
})();
