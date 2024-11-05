import { isValidEmail } from "../../scripts/utils.js";
const emailInput = document.querySelector("#email");

emailInput.addEventListener("input", handleEmail);

function handleEmail(event) {
  const email = event.target.value;
  if (isValidEmail(email)) {
    event.target.style.borderColor = "green";
    return;
  }
  event.target.style.borderColor = "red";
}
