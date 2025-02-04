import { clx } from "../../sdk/clx.ts";
// import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
const script = (id: string) => {
  const KEY = "store-cookie-consent";
  const ACCEPTED = "accepted";
  const HIDDEN = "!translate-y-[200%]";
  const consent = globalThis.window.localStorage?.getItem(KEY);
  const elem = document.getElementById(id);

  const handleScroll = () => {
    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        globalThis.window.localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };

  if (consent === ACCEPTED && elem) {
    elem.classList.add(HIDDEN);
  }
  addEventListener("load", handleScroll, { once: true });
};

function CookieConsent() {
  const id = "CookieConsent--teste";
  return (
    <>
      <div
        id={id}
        class={clx(
          "transform-gpu translate-x-[-50%] left-[50%] h-[178px] items-center w-full transition fixed bottom-0 z-50 sm:flex px-4 py-3 bg-[#f7f4ed] drop-shadow-sm",
          "sm:bottom-2 sm:justify-center sm:w-[77%] sm:h-[100px]",
        )}
      >
        <div
          class={clx(
            "flex flex-col gap-4 shadowrounded w-full max-w-[1200px] m-auto justify-around items-center",
            "sm:flex-row",
          )}
        >
          <div
            class={clx(
              "flex-auto flex gap-4 lg:gap-8 items-center",
              "sm:gap-2",
            )}
          >
            <h3 class="text-xl">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0997 3.33331H26.8997L36.6663 13.1V26.9L26.8997 36.6666H13.0997L3.33301 26.9V13.1L13.0997 3.33331Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 13.3333V22.2222"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 26.6667H20.0184"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h3>

            <div class="text-sm m-0 font-source-sans tracking-[0.07em] font-light text-black">
              <p>
                Nosso site utiliza cookies para melhorar sua experiência e
                personalizar o conteúdo que você<br />verá sobre a VIX.
                <a
                  href="/institucional/politica-de-privacidade"
                  class="font-normal underline"
                >
                  Saiba mais na nossa politica de Privacidade
                </a>
              </p>
            </div>
          </div>

          <button
            class={clx(
              "w-full h-9 bg-brown rounded=[1px] flex items-center justify-center text-white font-source-sans text-sm tracking-[0.07em] font-semibold text-center",
              "sm:w-[207px]",
            )}
            data-button-cc-accept
          >
            Aceitar
          </button>
          <button class="absolute top-3 right-3" data-button-cc-close>
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1045 1L1.10449 13"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.10449 1L13.1045 13"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}
export const LoadingFallback = () => null;
export default CookieConsent;
