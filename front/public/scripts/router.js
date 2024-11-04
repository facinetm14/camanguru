import { loadPage } from "./utils.js";

const routes =  new Map([
    ['/', '../pages/home.html'],
    ['/profile', '../pages/profile.html'],
    ['not_found', '../pages/404.html']
]);

export const routeUrl = async () =>  {
    const path = window.location.pathname;

    if (!routes.has(path)) {
        return loadPage(routes.get('not_found'));
    }

    return loadPage(routes.get(path));
}