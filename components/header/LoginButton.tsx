import { useState } from "preact/hooks";
import Icon from "../../components/ui/Icon.tsx";

const LinkArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.0006 12L10.758 16.2427L9.34375 14.8285L12.1722 12L9.34375 9.1716L10.758 7.7574L15.0006 12Z"
      fill="#BEA669"
    />
  </svg>
);

const BlackArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 8.9994L16.2427 13.242L14.8285 14.6563L12 11.8278L9.1716 14.6563L7.7574 13.242L12 8.9994Z"
      fill="black"
    />
  </svg>
);

const Close = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
  >
    <path
      d="M7.5 7.5L22.5 22.5M22.5 7.5L7.5 22.5"
      stroke="#030304"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

interface LoginButtonProps {
  variant: string;
  // session: Person | null;
}

export default function LoginButton({ variant }: LoginButtonProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <>
      <button
        id="vix-brasil__login-icon"
        class={`flex items-center gap-3 pl-4 pr-3 py-1 sm:bg-medium-brown-opacity font-source-sans text-xs tracking-[0.98px] text-black relative rounded-btn sm:border sm:border-brown`}
        onClick={() => {
          setLoginOpen(true);
        }}
      >
        <Icon id="account_icon" />

        {variant === "desktop" && (
          <>
            Olá!

            <span
              class={`${loginOpen ? "rotate-0" : "rotate-180"} duration-200`}
            >
              {BlackArrow}
            </span>
          </>
        )}
      </button>

      {variant !== "desktop" && (
        <div
          class={`${
            loginOpen ? "opacity-60 visible" : "invisible opacity-0"
          } fixed top-0 left-0 w-[100vw] h-[100vh] bg-black z-40 duration-200`}
        />
      )}

      <div
        class={`${
          loginOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } sm:bg-light-brown bg-white sm:absolute fixed sm:top-12 sm:left-0 sm:right-auto top-0 right-0 left-auto sm:w-[225px] sm:h-[300px] w-[80vw] h-[100vh] sm:py-4 sm:pl-5 sm:pr-4 duration-200 border border-medium-brown z-50`}
        onMouseLeave={() => {
          setLoginOpen(false);
        }}
      >
        {variant !== "desktop" && (
          <>
            <div class="flex justify-between items-center bg-light-brown p-4 w-full font-source-sans text-black font-bold text-sm uppercase">
              minha conta
              <button
                onClick={() => {
                  setLoginOpen(false);
                }}
              >
                {Close}
              </button>
            </div>

            <p class="flex gap-3 items-center px-8 font-source-sans text-lg tracking-[0.98px] text-black uppercase mb-9">
              <Icon id="account_icon" />

              Olá!
            </p>
          </>
        )}
        <a
          class="font-source-sans text-sm text-black font-light tracking-[0.98px] uppercase flex justify-between items-center py-2.5 sm:mx-0 mx-8  border-b border-medium-brown"
          href="/account#/orders"
        >
          Meus Pedidos {LinkArrow}
        </a>
        <a
          class="font-source-sans text-sm text-black font-light tracking-[0.98px] uppercase flex justify-between items-center py-2.5 sm:mx-0 mx-8  border-b border-medium-brown"
          href="/account#/wishlist"
        >
          Meus Favoritos {LinkArrow}
        </a>
        <a
          class="font-source-sans text-sm text-black font-light tracking-[0.98px] uppercase flex justify-between items-center py-2.5 sm:mx-0 mx-8  border-b border-medium-brown"
          href="/account#/profile"
        >
          Meu Perfil {LinkArrow}
        </a>
        <a
          class="font-source-sans text-sm text-black font-light tracking-[0.98px] uppercase flex justify-between items-center py-2.5 sm:mx-0 mx-8  border-b border-medium-brown"
          href="/account#/profile"
        >
          Minhas Preferências {LinkArrow}
        </a>
        <a
          class="font-source-sans text-sm text-black font-light tracking-[0.98px] uppercase flex justify-between items-center py-2.5 sm:mx-0 mx-8  border-b border-medium-brown"
          href="/account#/addresses"
        >
          Meus Endereços {LinkArrow}
        </a>
        <a
          class="font-source-sans text-sm text-black font-light tracking-[0.98px] uppercase flex justify-between items-center pt-2.5 sm:mx-0 mx-8  underline"
          href="/account#/profile"
        >
          Sair
        </a>
      </div>
    </>
  );
}
