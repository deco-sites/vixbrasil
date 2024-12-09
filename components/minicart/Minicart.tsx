import { AppContext } from "../../apps/site.ts";
import { MINICART_DRAWER_ID, MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useComponent } from "../../sections/Component.tsx";
import Icon from "../ui/Icon.tsx";

import Coupon from "./Coupon.tsx";
import VendorCode from "./VendorCode.tsx";
import CartItem, { Item } from "./Item.tsx";
import { useScript } from "@deco/deco/hooks";
export interface Minicart {
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
    refId?: string;
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
    vendor?: string;
    locale: string;
    currency: string;
    enableCoupon?: boolean;
    freeShippingTarget: number;
    checkoutHref: string;
  };
}
const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;
  window.STOREFRONT.CART.dispatch(form);
  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }
  // Disable form interactivity while cart is being submitted
  document.body.addEventListener(
    "htmx:before-send", // deno-lint-ignore no-explicit-any
    ({ detail: { elt } }: any) => {
      if (elt !== form) {
        return;
      }
      // Disable addToCart button interactivity
      document.querySelectorAll("div[data-cart-item]").forEach((container) => {
        container?.querySelectorAll("button")
          .forEach((node) => node.disabled = true);
        container?.querySelectorAll("input")
          .forEach((node) => node.disabled = true);
      });
    },
  );
};
const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};
export const action = async (_props: unknown, req: Request, ctx: AppContext) =>
  req.method === "PATCH"
    ? ({ cart: await ctx.invoke("site/loaders/minicart.ts") }) // error fallback
    : ({ cart: await ctx.invoke("site/actions/minicart/submit.ts") });
export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Error while updating cart
        </span>
        <span class="text-sm text-center">
          Click in the button below to retry or refresh the page
        </span>
      </div>

      <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Retry
      </button>
    </div>
  );
}
export default function Cart(
  {
    cart: {
      platformCart,
      storefront: {
        items,
        total,
        subtotal,
        coupon,
        vendor,
        discounts,
        locale,
        currency,
        enableCoupon = true,
        checkoutHref,
      },
    },
  }: {
    cart: Minicart;
  },
) {
  const count = items.length;
  return (
    <>
      <form
        class="contents"
        id={MINICART_FORM_ID}
        hx-sync="this:replace"
        hx-trigger="submit, change delay:300ms"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-post={useComponent(import.meta.url)}
        hx-swap="outerHTML"
      >
        {/* Button to submit the form */}
        <button hidden autofocus />

        {/* Add to cart controllers */}
        <input name="add-to-cart" type="hidden" />
        <button hidden name="action" value="add-to-cart" />

        {/* This contains the STOREFRONT cart. */}
        <input
          type="hidden"
          name="storefront-cart"
          value={encodeURIComponent(
            JSON.stringify({ coupon, currency, value: total, items }),
          )}
        />

        {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
        <input
          type="hidden"
          name="platform-cart"
          value={encodeURIComponent(JSON.stringify(platformCart))}
        />

        <div
          style={{ height: "calc(100vh - 72px)" }}
          class={clx(
            "flex flex-col flex-grow justify-center items-center overflow-hidden w-full",
            "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
          )}
        >
          {count === 0
            ? (
              <div class="flex flex-col gap-6 items-center">
                <Icon id="shopping_bag" size={64} />
                <span class="font-source-sans font-normal text-base ">
                  Seu carrinho está vazio
                </span>
                {
                  /* <label
                  for={MINICART_DRAWER_ID}
                  class="btn btn-outline no-animation"
                >
                  Choose products
                </label> */
                }
              </div>
            )
            : (
              <>
                {/* Cart Items */}
                <ul
                  role="list"
                  class="footer-items px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
                >
                  {items.map((item, index) => (
                    <li>
                      <CartItem
                        item={item}
                        index={index}
                        locale={locale}
                        currency={currency}
                      />
                    </li>
                  ))}
                </ul>

                {/* Cart Footer */}
                <footer class="w-full shadow-[0px_-10px_20px_0px_#00000024]">
                  <details class="collapse group/footer-minicart border-t border-base-200 p-2 flex flex-col bg-white pt-0 rounded-none">
                    <summary class="collapse-title p-0 !flex justify-center botder-t-[2px] border-[#f7f4ed] h-10 min-h-5">
                      <Icon
                        id="footer-minicart-open"
                        width={48}
                        height={20}
                        class="group-open/footer-minicart:hidden block"
                      />
                      <Icon
                        id="footer-minicart-close"
                        width={48}
                        height={20}
                        class="group-open/footer-minicart:block hidden"
                      />
                    </summary>
                    <div class="collapse-content w-full flex flex-col gap-4 p-0 px-2">
                      {enableCoupon && (
                        <Coupon
                          coupon={coupon}
                          discount={formatPrice(discounts, currency, locale) ??
                            ""}
                        />
                      )}

                      <VendorCode
                        vendor={vendor}
                      />
                    </div>
                  </details>

                  {/* Total */}
                  <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4">
                    <div class="w-full flex justify-between gap-2 border-b border-[#e0e0e0] font-source-sans">
                      <span class="font-normal text-[#4d4d4d] text-xs tracking-[0.07em]">
                        Subtotal
                      </span>
                      <output
                        form={MINICART_FORM_ID}
                        class="font-normal text-[#4d4d4d] text-xs tracking-[0.07em]"
                      >
                        {formatPrice(subtotal, currency, locale)}
                      </output>
                    </div>
                    {discounts > 0 && (
                      <div class="w-full flex justify-between items-center gap-2 border-b border-[#e0e0e0] font-source-sans">
                        <span class="font-normal text-[#4d4d4d] text-xs tracking-[0.07em]">
                          Descontos
                        </span>
                        <span class="font-source-sansfont-normal text-[#4d4d4d] text-xs tracking-[0.07em]">
                          - {formatPrice(discounts, currency, locale)}
                        </span>
                      </div>
                    )}
                    <div class="flex justify-between items-center w-full font-source-sans">
                      <span class="font-semibold text-black text-sm tracking-[0.07em]">
                        Total
                      </span>
                      <output
                        form={MINICART_FORM_ID}
                        class="font-semibold text-black text-sm tracking-[0.07em]"
                      >
                        {formatPrice(total, currency, locale)}
                      </output>
                    </div>
                  </div>

                  <div class="p-4 flex items-center justify-between lg:gap-3 gap-1.5 lg:flex-row flex-col-reverse ">
                    <label
                      for={MINICART_DRAWER_ID}
                      class="flex items-center justify-center w-full text-sm font-semibold font-source-sans text-black bg-transparent h-9 hover:bg-[#bea669] duration-200 border border-black hover:border-[#bea669] hover:text-white"
                    >
                      Continuar comprando
                    </label>
                    <a
                      class="flex items-center justify-center w-full text-base font-semibold font-source-sans text-white bg-black h-9 uppercase hover:bg-[#bea669] duration-200 border border-black hover:border-[#bea669]"
                      href={checkoutHref}
                      hx-on:click={useScript(sendBeginCheckoutEvent)}
                    >
                      <span class="[.htmx-request_&]:hidden">
                        Finalizar Compra
                      </span>
                      <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                    </a>
                  </div>
                </footer>
              </>
            )}
        </div>
      </form>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </>
  );
}
