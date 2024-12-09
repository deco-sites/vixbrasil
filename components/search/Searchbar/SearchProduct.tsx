import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { useOffer } from "../../../sdk/useOffer.ts";
import { clx } from "../../../sdk/clx.ts";
import { formatPrice } from "../../../sdk/format.ts";
import { relative } from "../../../sdk/url.ts";
import { useSendEvent } from "../../../sdk/useSendEvent.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 260;
const HEIGHT = 347;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function SearchProduct({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const { url, image: images, offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;
  const front = images?.find((item) => item.name === "vitrine");
  const back = images?.find((item) => item.name === "hover");

  const { listPrice, price, availability, installments } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const relativeUrl = relative(url);

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  return (
    <div
      {...event}
      class={clx("card card-compact group pb-5", _class)}
    >
      <figure
        class={clx(
          "relative min-h-[347px] rounded-none",
        )}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "w-full",
            !inStock && "opacity-70",
          )}
        >
          <Image
            src={front?.url!}
            alt={front?.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-contain",
              "w-full",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front?.url!}
            alt={back?.alternateName ?? front?.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-contain",
              "w-full absolute top-0",
              "transition-opacity opacity-0 lg:group-hover:opacity-100",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>
      </figure>

      <a href={relativeUrl} class="pt-2 text-center text-base">
        <span class="font-source-sans tracking-[0.07em] text-black uppercase">
          {title}
        </span>

        <div class="text-center">
          {listPrice
            ? (
              <span class="line-through font-source-sans font-normal text-black">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )
            : (
              <span class="font-source-sans font-normal text-black">
                {formatPrice(price, offers?.priceCurrency)}
              </span>
            )}
        </div>
        <div class="text-center">
          <span class="font-source-sans font-normal text-black">
            {installments}
          </span>
        </div>
      </a>
    </div>
  );
}

export default SearchProduct;
