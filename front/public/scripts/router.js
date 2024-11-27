import { loadPage } from "./utils.js";

const BASE_PATH_TO_PAGES = "../pages";
const routes = new Map([
  ["/", `${BASE_PATH_TO_PAGES}/home/home.html`],
  ["/register", `${BASE_PATH_TO_PAGES}/home/home.html`],
  ["/profile", `${BASE_PATH_TO_PAGES}/profile/profile.html`],
  ["not_found", `${BASE_PATH_TO_PAGES}/404/404.html`],
  ["/confirm", `${BASE_PATH_TO_PAGES}/confirm/confirm.html`],
]);

export const routeUrl = async () => {
  const path = window.location.pathname;

  if (path.match(/^\/activate\//)) {
    localStorage.setItem("validationToken", path.split("/").at(-1));
    return (window.location.href = "/");
  }

  if (!routes.has(path)) {
    console.log("not_found");
    return loadPage(routes.get("not_found"));
  }
  return loadPage(routes.get(path));
};
