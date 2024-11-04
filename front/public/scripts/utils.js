const getHtmlFromPath = async (path) => {
    const resp = await fetch(path);
    const html = await resp.text();

    return html;
}

export const loadComponent = async (pathToComponent, target, option) => {
    const html = await getHtmlFromPath(pathToComponent);
    const targetElement = document.querySelector(target);
    if (!option) {
        console.log('OK');
        targetElement.appendChild(html);
    }
    else {
        console.log('WHY ?');
    }
}

export const loadPage = async (path) => {
    const html = await getHtmlFromPath(path);

    const app = document.querySelector("#app");
    app.innerHTML = html;
}