import { useState } from "preact/hooks";
import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "../../../../sdk/useOffer.ts";
import { formatPrice } from "../../../../sdk/format.ts";
import Icon from "../../../ui/Icon.tsx";
import { useShelfContext } from "../../../../islands/AddToCartShelf/context/index.tsx";
export interface AddToCartShelfProps {
  product: Product;
}

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function ShelfInfo({ product }: AddToCartShelfProps) {
  const { state, dispatch } = useShelfContext();

  const [dropdown, setDropdown] = useState("h-[0px]");
  const { offers, isVariantOf } = product;
  const icon = isVariantOf?.additionalProperty.find((item) =>
    item.name === "icone_categoria"
  );

  const { listPrice, price } = useOffer(offers);

  return (
    <div class="flex items-center justify-center w-full">
      <div class="relative">
        <div class="flex items-center justify-center gap-1 py-[10px] lg:group-hover/image-shelf:opacity-0">
          {icon && (
            <img
              src={`https://vixbrasil.vtexassets.com/arquivos/${
                removeAccents(
                  icon.value ?? "",
                )
              }.png`}
              width={"auto"}
              height={"auto"}
              alt="Product category icon"
              class="lg:w-[30px] lg:h-[30px] w-[13px] h-[13px]"
            />
          )}
          <p>
            {listPrice !== price && (
              <span class="block line-through font-source-sans tracking-[0.07em] text-[#979797] text-xs">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}
            <span class="block font-source-sans tracking-[0.07em] lg:text-sm text-xs text-black">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </p>
        </div>

        <div
          class="hidden lg:block h-auto border border-[#e8e8e8] mx-auto cursor-pointer w-[120px] mb-[10px] absolute top-3 bg-white opacity-0 duration-200 group-hover/image-shelf:opacity-100"
          onMouseLeave={() => {
            setDropdown("h-[0px]");
          }}
        >
          <button
            class="flex w-full items-center justify-between pr-3 gap-1 list-none font-source-sans text-sm tracking-[0.07em] text-black list"
            onClick={() => {
              setDropdown("h[100%]");
            }}
          >
            {icon && (
              <img
                src={`https://vixbrasil.vtexassets.com/arquivos/${
                  removeAccents(
                    icon.value ?? "",
                  )
                }.png`}
                width={"auto"}
                height={"auto"}
                alt="Product category icon"
                class="lg:w-[30px] lg:h-[30px] w-[13px] h-[13px]"
              />
            )}
            {state.singleItem?.value}
            <Icon id="down-sm-arrow" size={12} class="min-w-3" />
          </button>
          <ul
            class={`${dropdown} overflow-hidden duration-200 absolute z-10`}
          >
            {isVariantOf?.hasVariant.map((item) => {
              const value = item?.additionalProperty?.find((i) =>
                i?.name === "Tamanho"
              )?.value;

              if (value === "KIT") {
                return null;
              }

              return (
                <li
                  class={`block cursor-pointer w-full bg-white hover:bg-[#bea669] duration-200 p-2`}
                  onClick={() => {
                    dispatch({
                      type: "SET_ITEM",
                      payload: {
                        id: item.sku,
                        seller: "1",
                        value: value ?? "",
                        name: item.name ?? "",
                      },
                    });
                  }}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
