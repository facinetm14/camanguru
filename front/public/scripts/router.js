import { loadPage } from "./utils.js";

const BASE_PATH_TO_PAGES = '../pages'
const routes =  new Map([
    ['/', `${BASE_PATH_TO_PAGES}/home/home.html`],
    ['/profile', `${BASE_PATH_TO_PAGES}../profile/profile.html`],
    ['not_found', `${BASE_PATH_TO_PAGES}../404/404.html`]
]);

export const routeUrl = async () =>  {
    const path = window.location.pathname;

    if (!routes.has(path)) {
        return loadPage(routes.get('not_found'));
    }
    return loadPage(routes.get(path));
}