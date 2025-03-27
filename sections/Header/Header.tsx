import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu, { MobileMenuItem } from "../../components/header/Menu.tsx";
import NavItem, { NavItemProps } from "../../components/header/NavItem.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import {
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import SignIn from "../../components/header/SignIn.tsx";
import HeaderFunctions from "../../islands/functions/headerFunctions.tsx";
import { useDevice } from "@deco/deco/hooks";
import { useScript } from "site/sdk/useScript.ts";

import { type LoadingFallbackProps } from "@deco/deco";
import { NAVBAR_HEIGHT_DESKTOP } from "../../constants.ts";
import CookieConsent from "../Miscellaneous/CookieConsent.tsx";
export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionProps {
  /**
   * @title Desktop items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItemProps[] | null;
  /**  @title Mobile items */

  mobileItems?: MobileMenuItem[] | undefined;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  /**
   * @description Usefull for lazy loading hidden elements, like hamburguer menus etc
   * @hide true */
  loading?: "eager" | "lazy";
}
type Props = Omit<SectionProps, "alert">;
const Desktop = ({ navItems, logo, searchbar, loading }: Props) => (
  <div
    class={`group/header backdrop-blur-xs w-full hover:bg-base-100 hover:backdrop-blur-none ease-in duration-200 z-50 fixed`}
    id="vix-brasil-header"
  >
    <div class="flex flex-col gap-4 max-w-full px-6">
      <div class="grid grid-cols-header place-items-center ">
        <div
          id="vix-brasil-logo"
          class="self-center place-self-start ease-in duration-200 group-hover/header:invert-0 group-hover/header:brightness-100 m"
        >
          <a href="/" aria-label="Vix Brasil">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 23}
            />
          </a>
        </div>

        <div class="flex justify-center items-center w-full">
          <ul id="vix-brasil-navigation" class="flex">
            {navItems?.slice(0, 10).map((item) => (
              <NavItem item={item} key={item} />
            ))}
          </ul>
          <div>{/* ship to */}</div>
        </div>
        <div
          id="vix-brasil__header-icons"
          class="w-full justify-end self-center flex gap-8 place-self-end items-center group-hover/header:text-black duration-200"
        >
          <div>
            {loading === "lazy"
              ? (
                <div class="flex justify-center items-center">
                  <span class="loading loading-spinner" />
                </div>
              )
              : <Searchbar {...searchbar} />}
          </div>
          <label
            id="vix-brasil__search-bar--open"
            for={SEARCHBAR_POPUP_ID}
            class="flex items-center cursor-pointer group-hover/header:text-black duration-200 z-10"
            aria-label="search icon button"
          >
            <Icon id="search" size={18} />
          </label>
          <SignIn variant="desktop" />
          <a href="/account#/wishlist">
            <Icon id="favorite" size={20} />
          </a>
          <Bag />
        </div>
      </div>
    </div>
  </div>
);
const Mobile = ({ logo, searchbar, mobileItems, loading }: Props) => (
  <div
    class={`backdrop-blur-xs w-full ease-in duration-200 z-50 fixed`}
    id="vix-brasil-header"
  >
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside
          class="bg-white"
          titleClass="font-source-sans text-[#030303] text-sm font-semibold uppercase"
          headerClass="bg-[#f7f4ed] p-1.5"
          title="Menu"
          drawer={SIDEMENU_DRAWER_ID}
        >
          {loading === "lazy"
            ? (
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
                style={{ minWidth: "100vw" }}
              >
                <span class="loading loading-spinner" />
              </div>
            )
            : <Menu mobileItems={mobileItems} />}
        </Drawer.Aside>
      }
    />

    <div
      id="vix-brasil__header-icons"
      class="grid place-items-center w-screen pl-3 pr-4 gap-4"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "min-content min-content 1fr min-content min-content",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="open menu"
      >
        <Icon id="menu" size={22} />
      </label>
      <label for={SEARCHBAR_DRAWER_ID} aria-label="search icon button">
        <input type="checkbox" id={SEARCHBAR_DRAWER_ID} class="peer hidden" />
        <span
          id="vix-brasil__search-bar--open"
          class="peer-checked:hidden block"
        >
          <Icon id="search" size={18} />
        </span>
        <span
          id="vix-brasil__search-bar--close"
          class="peer-checked:block hidden"
        >
          <Icon id="close" size={18} />
        </span>
      </label>

      {logo && (
        <a
          id="vix-brasil-logo"
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="logo"
        >
          <Image src={logo.src} alt={logo.alt} width={170} height={53} />
        </a>
      )}

      <SignIn variant="mobile" />

      <Bag />
    </div>
    <div class="w-screen overflow-y-auto">
      {loading === "lazy"
        ? (
          <div class="h-full w-full flex items-center justify-center">
            <span class="loading loading-spinner" />
          </div>
        )
        : <Searchbar {...searchbar} />}
    </div>
  </div>
);
function Header({
  logo = {
    src:
      "https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.128/img/header/icon-logo-color___89754752d03a11168a5440e6da2b721b.svg",
    width: 257,
    height: 57,
    alt: "Logo Vix Brasil",
  },
  ...props
}: Props) {
  const device = useDevice();

  const scriptHeaderFunction = useScript(HeaderFunctions);

  const eventPageView = () => {
    const params = {
      location: globalThis?.window?.location?.href,
      page: globalThis?.window?.location?.pathname,
      title: globalThis?.document?.title,
      originalLocation: globalThis?.window?.location?.host,
      originalReferrer: "",
      "gtm.uniqueEventId": 55,
    };

    globalThis?.document?.addEventListener("DOMContentLoaded", function () {
      console.log(`CustomEventData: event view pageView ready`);
      globalThis?.window?.dataLayer.push({
        event: "pageView",
        params: params,
      });
    });
  };

  const sendEvent = useScript(eventPageView);

  return (
    <header
      style={{
        height: device === "desktop"
          ? NAVBAR_HEIGHT_DESKTOP
          : NAVBAR_HEIGHT_MOBILE,
      }}
      class="w-full"
    >
      <CookieConsent />

      {device === "desktop"
        ? <Desktop logo={logo} {...props} />
        : <Mobile logo={logo} {...props} />}

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: scriptHeaderFunction }}
      />
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: sendEvent }}
      />
    </header>
  );
}
export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...(props as any)} loading="lazy" />
);
export default Header;
