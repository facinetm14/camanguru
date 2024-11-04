import { loadComponent } from "./utils.js";
import { Components } from "./enums.js";

(async () => {
  loadComponent(Components.LOGIN_FORM, "#home-container");
})();