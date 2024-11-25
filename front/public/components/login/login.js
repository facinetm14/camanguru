import { userService } from "../../usecases/userService";

const userNameInput = document.querySelector("#username-from-login");
const passwdInput = document.querySelector("#password-from-login");
const loginBtn = document.querySelector("#login-btn");


loginBtn.addEventListener('click', handleLoginFormSubmit);

async function handleLoginFormSubmit(_event) {
    const username = userNameInput.value;
    const passwd = userNameInput.value;

    if (username && passwd) {
        const loginUser = await userService.login(username, passwd);
    }
}