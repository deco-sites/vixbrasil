import { useEffect, useState } from "preact/hooks";
import Icon from "../../../ui/Icon.tsx";
import { KitProduct } from "../../KitLook/types.ts";
import { formatPrice } from "../../../../sdk/format.ts";

type ShelfDataActions = {
  // deno-lint-ignore no-explicit-any
  state: any; // deno-lint-ignore no-explicit-any
  dispatch: any;
};

interface Props {
  top: string;
  bottom: string;
  useShelfContext: () => ShelfDataActions;
}

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function KitShelfInfo({ top, bottom, useShelfContext }: Props) {
  const { state, dispatch } = useShelfContext();
  const [dropdownTop, setDropdownTop] = useState("h-[0px]");
  const [dropdownBottom, setDropdownBottom] = useState("h-[0px]");

  const [product, setProduct] = useState<KitProduct[] | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/catalog_system/pub/products/search?fq=skuId:${top}&fq=skuId:${bottom}`,
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  const topIcon = product?.[0]?.icone_categoria?.[0] ?? "";
  const bottomIcon = product?.[1]?.icone_categoria?.[0] ?? "";

  const availableTopProduct = product?.[0]?.items?.find((item) =>
    item.sellers[0].commertialOffer.AvailableQuantity !== 0
  );

  const topListPrice = availableTopProduct?.sellers[0].commertialOffer
    .ListPrice;
  const topPrice = availableTopProduct?.sellers[0].commertialOffer.Price;

  const availableBottomProduct = product?.[1]?.items?.find((item) =>
    item.sellers[0].commertialOffer.AvailableQuantity !== 0
  );

  const bottomListPrice = availableBottomProduct?.sellers[0].commertialOffer
    .ListPrice;
  const bottomPrice = availableBottomProduct?.sellers[0].commertialOffer.Price;

  if (!product) {
    return (
      <div
        style={{
          height: "50px",
          containIntrinsicSize: "50px",
          contentVisibility: "auto",
        }}
        class="flex justify-center items-center"
      >
        <span class="loading loading-spinner" />
      </div>
    );
  }

  return (
    <div class="flex items-center justify-center w-full">
      <div class="relative">
        <div class="flex items-center justify-center gap-1 py-[10px] lg:group-hover/image-shelf:opacity-0">
          {topIcon && (
            <img
              src={`https://vixbrasil.vtexassets.com/arquivos/${
                removeAccents(
                  topIcon ?? "",
                )
              }.png`}
              width={"auto"}
              height={"auto"}
              alt="Product category icon"
              class="lg:w-[30px] lg:h-[30px] w-[13px] h-[13px]"
            />
          )}
          <p>
            {topListPrice !== topPrice && (
              <span class="block line-through font-source-sans tracking-[0.07em] text-[#979797] text-xs">
                {formatPrice(topListPrice)}
              </span>
            )}
            <span class="block font-source-sans tracking-[0.07em] lg:text-sm text-xs text-black">
              {formatPrice(topPrice)}
            </span>
          </p>
          {bottomIcon && (
            <img
              src={`https://vixbrasil.vtexassets.com/arquivos/${
                removeAccents(
                  bottomIcon ?? "",
                )
              }.png`}
              width={"auto"}
              height={"auto"}
              alt="Product category icon"
              class="lg:w-[30px] lg:h-[30px] w-[13px] h-[13px]"
            />
          )}
          <p>
            {bottomListPrice !== bottomPrice && (
              <span class="block line-through font-source-sans tracking-[0.07em] text-[#979797] text-xs">
                {formatPrice(bottomListPrice)}
              </span>
            )}
            <span class="block font-source-sans tracking-[0.07em] lg:text-sm text-xs text-black">
              {formatPrice(bottomPrice)}
            </span>
          </p>
        </div>

        <div class="hidden lg:flex items-start gap-4 absolute top-3 w-full">
          <div
            class=" h-auto border border-[#e8e8e8] mx-auto cursor-pointer w-[90px] mb-[10px] bg-white opacity-0 duration-200 group-hover/image-shelf:opacity-100"
            onMouseLeave={() => {
              setDropdownTop("h-[0px]");
            }}
          >
            <button
              class="flex w-full items-center justify-between pr-3 gap-1 list-none font-source-sans text-sm tracking-[0.07em] text-black list"
              onClick={() => {
                setDropdownTop("h[100%]");
              }}
            >
              {topIcon && (
                <img
                  src={`https://vixbrasil.vtexassets.com/arquivos/${
                    removeAccents(
                      topIcon ?? "",
                    )
                  }.png`}
                  width={"auto"}
                  height={"auto"}
                  alt="Product category icon"
                  class="lg:w-[30px] lg:h-[30px] w-[13px] h-[13px]"
                />
              )}
              {state.kitItems?.[0]?.value ? state.kitItems[0].value : "Tam."}
              <Icon id="down-sm-arrow" size={12} class="min-w-3" />
            </button>
            <ul
              class={`${dropdownTop} overflow-hidden duration-200 absolute z-10`}
            >
              {product?.[0]?.items?.map((item) => {
                if (item.Tamanho[0] === "KIT") {
                  return null;
                }
                const avaibility =
                  item.sellers[0].commertialOffer.AvailableQuantity;
                return (
                  <li
                    class={`block cursor-pointer w-[120px] bg-white hover:bg-[#bea669] duration-200 p-2 font-source-sans text-sm tracking-[0.07em] ${
                      avaibility && "opacity-60"
                    }`}
                    onClick={() => {
                      dispatch({
                        type: "SET_KIT_1",
                        payload: {
                          id: item.itemId,
                          refId: item.referenceId[0].Value,
                          seller: item.sellers[0].sellerId,
                          quantity: 1,
                          image: item.images[0].imageUrl,
                          value: item.Tamanho[0],
                          variant: item.complementName,
                          listPrice: item.sellers[0].commertialOffer.ListPrice,
                          price: item.sellers[0].commertialOffer.Price,
                        },
                      });
                    }}
                  >
                    {item.Tamanho[0]}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            class="h-auto border border-[#e8e8e8] mx-auto cursor-pointer w-[90px] mb-[10px] bg-white opacity-0 duration-200 group-hover/image-shelf:opacity-100"
            onMouseLeave={() => {
              setDropdownBottom("h-[0px]");
            }}
          >
            <button
              class="flex w-full items-center justify-between pr-3 gap-1 list-none font-source-sans text-sm tracking-[0.07em] text-black list"
              onClick={() => {
                setDropdownBottom("h[100%]");
              }}
            >
              {bottomIcon && (
                <img
                  src={`https://vixbrasil.vtexassets.com/arquivos/${
                    removeAccents(
                      bottomIcon ?? "",
                    )
                  }.png`}
                  width={"auto"}
                  height={"auto"}
                  alt="Product category icon"
                  class="lg:w-[30px] lg:h-[30px] w-[13px] h-[13px]"
                />
              )}
              {state.kitItems?.[1]?.value ? state.kitItems[1].value : "Tam."}
              <Icon id="down-sm-arrow" size={12} class="min-w-3" />
            </button>
            <ul
              class={`${dropdownBottom} overflow-hidden duration-200 absolute z-10`}
            >
              {product?.[1]?.items?.map((item) => {
                if (item.Tamanho[0] === "KIT") {
                  return null;
                }

                const avaibility =
                  item.sellers[0].commertialOffer.AvailableQuantity;
                return (
                  <li
                    class={`block cursor-pointer w-[120px] bg-white hover:bg-[#bea669] duration-200 p-2 font-source-sans text-sm tracking-[0.07em] ${
                      avaibility && "opacity-60"
                    }`}
                    onClick={() => {
                      dispatch({
                        type: "SET_KIT_2",
                        payload: {
                          id: item.itemId,
                          refId: item.referenceId[0].Value,
                          seller: item.sellers[0].sellerId,
                          quantity: 1,
                          image: item.images[0].imageUrl,
                          value: item.Tamanho[0],
                          variant: item.complementName,
                          listPrice: item.sellers[0].commertialOffer.ListPrice,
                          price: item.sellers[0].commertialOffer.Price,
                        },
                      });
                    }}
                  >
                    {item.Tamanho[0]}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
