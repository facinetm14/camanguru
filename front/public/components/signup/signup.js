import {
  isValidEmail,
  isPasswordStrong,
  loadPage,
} from "../../scripts/utils.js";
import { userService } from "../../usecases/userService.js";

const usernameInput = document.querySelector("#username");
const adressInput = document.querySelector("#adress");
const emailInput = document.querySelector("#email");
const agreementCheckbox = document.querySelector("#agreementCheckbox");
const passwdConfirmationInput = document.querySelector(
  "#password-confirmation"
);
const passwdInput = document.querySelector("#password");
const signupBtn = document.querySelector("#btn-signup");

function handleInput(event, validator) {
  const inputValue = event.target.value;
  if (validator(inputValue)) {
    event.target.style.borderColor = "green";
    return;
  }
  event.target.style.borderColor = "red";
}

function isMatchedPassword(passwdConfirmation) {
  return passwdInput.value === passwdConfirmation;
}

async function handleSignUpFormSubmit(event) {
  const username = usernameInput.value;
  const adress = adressInput.value;
  const email = emailInput.value;
  const agreement = agreementCheckbox.value === "on";
  const passwdConfirmation = passwdConfirmationInput.value;
  const passwd = passwdInput.value;

  if (!username) {
    return;
  }

  if (!adress) {
    return;
  }

  if (!email || !isValidEmail(email)) {
    return;
  }

  if (!passwd || !isPasswordStrong(passwd)) {
    console.log("empty passwd");
    return;
  }

  if (!passwdConfirmation || !isMatchedPassword(passwdConfirmation)) {
    return;
  }

  if (!agreement) {
    return;
  }

  const user = {
    email,
    adress,
    passwd,
    username,
  };

  const registerUser = await userService.register(user);
  if (registerUser.ok) {
    window.location.href = "/confirm";
    return loadPage("/confirm");
  }
}

// Event listeners
passwdInput.addEventListener("input", (event) =>
  handleInput(event, isPasswordStrong)
);
passwdConfirmationInput.addEventListener("input", (event) =>
  handleInput(event, isMatchedPassword)
);
emailInput.addEventListener("input", (event) =>
  handleInput(event, isValidEmail)
);

signupBtn.addEventListener("click", handleSignUpFormSubmit);
