import { loadComponent, loadPage } from "../../scripts/utils.js";
import { Components } from "../../scripts/enums.js";
import { userService } from "../../usecases/userService.js";

(async () => {
  const validationToken = localStorage.getItem("validationToken");
  if (validationToken) {
    await userService.verify(validationToken);
    localStorage.clear("validationToken");
    return loadComponent("login", Components.LOGIN_FORM, "#home-container");
  }

  if (location.href.endsWith("/register")) {
    loadComponent("signup", Components.SIGN_UP, "#home-container");
  } else {
    loadComponent("login", Components.LOGIN_FORM, "#home-container");
  }
})();
