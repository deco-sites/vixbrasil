// deno-lint-ignore-file no-explicit-any

import { Script } from "apps/website/types.ts";
import { useScriptAsDataURI } from "@deco/deco/hooks";
const snippet = () => {
  const clientNavigation = (e: any) => {
    e.preventDefault();
    if (e?.arguments?.[2]) {
      window.location.href = window.location.origin + e?.arguments[2];
    }
  };
  addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("last-page", window.location.href);
  });
  addEventListener("pushstate", clientNavigation);
};
const loader = (): Script => {
  const transformReq = () => {
    const script = `<script defer src="${
      // deno-lint-ignore react-rules-of-hooks
      useScriptAsDataURI(snippet)}"></script>`;
    return script;
  };
  return ({ src: transformReq });
};
export default loader;
