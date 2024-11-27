import { userService } from "../../usecases/userService.js";

const userNameInput = document.querySelector("#username-from-login");
const passwdInput = document.querySelector("#password-from-login");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", handleLoginFormSubmit);

async function handleLoginFormSubmit(_event) {
  const username = userNameInput.value;
  const passwd = passwdInput.value;

  if (username && passwd) {
    const loginUserResp = await userService.signIn(username, passwd);
    if (loginUserResp.ok) {
      const user = await loginUserResp.json();
      const { sessionId } = user;
      sessionStorage.setItem("sessionId", sessionId);
      window.location.href = "/profile";
    }
  }
}
