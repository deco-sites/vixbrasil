import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "@deco/deco/hooks";
import { Context } from "@deco/deco";
const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Sizebay  */}
        <script
          defer
          id="sizebay-vfr-v4"
          src="https://static.sizebay.technology/1165/prescript.js"
        >
        </script>
        {/* End Sizebay  */}

        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />
        <link
          href={asset(`/category.css`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200..900&display=swap"
          rel="stylesheet"
        />

        {/* Slick CSS */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
        />
      </Head>
      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PRD9CF2N"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        >
        </iframe>
      </noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* jQuery */}
      <script
        type="text/javascript"
        src="//code.jquery.com/jquery-1.11.0.min.js"
      />
      <script
        type="text/javascript"
        src="//code.jquery.com/jquery-migrate-1.2.1.min.js"
      />

      {/* Slick JS */}
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
      />

      {/* Service Worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
