import { loadComponent } from "../../scripts/utils.js";
import { Components } from "../../scripts/enums.js";
(async () => {
  loadComponent('signup',Components.SIGN_UP, "#home-container");
})();