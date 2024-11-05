const getHtmlFromPath = async (path) => {
  const resp = await fetch(path);
  const html = await resp.text();

  return html;
};

const getJsPathFromHtmlPath = (path) => {
  return path.replace(".html", ".js");
};

const loadJs = (pathToJs) => {
  const scriptNode = document.createElement("script");
  scriptNode.src = pathToJs;
  scriptNode.type = "module";
  document.body.appendChild(scriptNode);
};

export const loadComponent = async (
  componentName,
  pathToComponent,
  target,
  option
) => {
  const html = await getHtmlFromPath(pathToComponent);

  const container = document.createElement("div");
  container.classList.add(`${componentName}-container`);
  container.innerHTML = html;

  const targetElement = document.querySelector(target);
  if (!option) {
    targetElement.appendChild(container);
  }

  const pathToJs = getJsPathFromHtmlPath(pathToComponent);
  const jsResp = await fetch(pathToJs, { method: "HEAD" });

  if (jsResp.ok) {
    loadJs(pathToJs);
  }
};

export const loadPage = async (path) => {
  const html = await getHtmlFromPath(path);
  const app = document.querySelector("#app");
  app.innerHTML = html;
  const pathToJs = getJsPathFromHtmlPath(path);
  const jsResp = await fetch(pathToJs, { method: "HEAD" });
  if (jsResp.ok) {
    loadJs(pathToJs);
  }
};

export const isValidEmail = (email) => {
	const patterns = /^[^\s@]+@[^\s@]+\./;
	const emailRegex = new RegExp(patterns);
	return email.match(emailRegex) ? true : false;
}
