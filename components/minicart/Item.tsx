import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import Icon from "../ui/Icon.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
import { useScript } from "site/sdk/useScript.ts";
export type Item = AnalyticsItem & {
  refId: string;
  listPrice: number;
  image: string;
};
export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}
const QUANTITY_MAX_VALUE = 100;
const removeItemHandler = () => {
  const itemID = (event?.currentTarget as HTMLButtonElement | null)
    ?.closest("fieldset")
    ?.getAttribute("data-item-id");
  if (typeof itemID === "string") {
    window.STOREFRONT.CART.setQuantity(itemID, 0);
  }
};
function CartItem({ item, index, locale, currency }: Props) {
  const { image, listPrice, price = Infinity, quantity, refId } = item;
  const isGift = price < 0.01;
  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_variant.split("-")[0].trim();
  // deno-lint-ignore no-explicit-any
  const size = (item as any).item_variant.slice(-2);

  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class="grid grid-rows-1 gap-2 pt-6 pb-8 bg-white pr-3"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <Image
        alt={name}
        src={image}
        style={{ aspectRatio: "108 / 150" }}
        width={108}
        height={150}
        class="h-full object-contain"
      />

      {/* Info */}
      <div class="flex flex-col gap-2">
        {/* Name and Remove button */}
        <div class="flex justify-between items-start">
          <div>
            <legend class="font-medium font-source-sans text-xs tracking-[0.07em] uppercase text-black">
              {name}
            </legend>
            <span class="font-normal font-source-sans text-xs text-[#979797]">
              {refId}
            </span>
          </div>
          <button
            class={clx(
              isGift && "hidden",
              "w-3 h-3",
            )}
            hx-on:click={useScript(removeItemHandler)}
          >
            <Icon id="trash" size={12} />
          </button>
        </div>

        {/* Price Block */}
        <div class="flex lg:items-center gap-2 justify-between lg:flex-row flex-col lg:max-w-[100%] max-w-[120px]">
          <p class="font-semibold font-source-sans text-sm text-black tracking-[0.07em]">
            {listPrice !== price && (
              <span class="line-through text-xs text-[#727273] font-normal font-source-sans tracking-normal">
                {formatPrice(listPrice, currency, locale)} <br />
              </span>
            )}
            {formatPrice(price, currency, locale)}
          </p>
          <span class="font-medium font-source-sans tracking-[0.07em] text-black text-xs">
            Tamanho: {size}
          </span>
          {/* Quantity Selector */}
          <div class={clx(isGift && "hidden")}>
            <QuantitySelector
              min={0}
              max={QUANTITY_MAX_VALUE}
              value={quantity}
              name={`item::${index}`}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
}
export default CartItem;
