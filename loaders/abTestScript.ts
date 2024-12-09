import type { AppContext } from "../apps/site.ts";

declare global {
  interface Window {
    trafficToDeco: number;
    decoUrl: string;
  }
}

const maybeRedirectUser = () => {
  const currentUrl = new URL(globalThis.window.location.href);

  // Define keys for localStorage, using also traffic as key
  const redirectKey = `deco_redirect_${globalThis.window.trafficToDeco}`;
  const shouldRedirect = localStorage.getItem(redirectKey);

  // If the key doesn't exist, sort the user and set the flag accordingly
  if (shouldRedirect === null) {
    const random = Math.random();
    const userShouldRedirect = random <= globalThis.window.trafficToDeco;
    localStorage.setItem(redirectKey, userShouldRedirect.toString());
  }

  // Check the flag, and redirect if true
  if (localStorage.getItem(redirectKey) === "true") {
    const newUrl = new URL(
      currentUrl.pathname + currentUrl.search,
      globalThis.window.decoUrl,
    );
    const urlToRedirect = newUrl.href;
    globalThis.window.location.href = urlToRedirect;
  }
};

export default function abTestScript(
  _props: null,
  _req: Request,
  ctx: AppContext,
) {
  return new Response(
    `globalThis.window.decoUrl = "${ctx.decoHostToRedirect}";
globalThis.window.trafficToDeco = ${ctx.trafficToDeco};
(${maybeRedirectUser})();`,
    {
      headers: {
        "Cache-Control": "public, max-age=30",
      },
    },
  );
}
