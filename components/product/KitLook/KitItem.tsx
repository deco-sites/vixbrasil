import { useEffect, useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import { formatPrice } from "../../../sdk/format.ts";
import { Item, KitProduct } from "./types.ts";
import { useKitContext } from "./context/index.tsx";
import { useSendEvent } from "../../../sdk/useSendEvent.ts";

export interface Props {
  productId: string;
  dataDispatch: "SET_DATA_1" | "SET_DATA_2";
}

interface InputProps {
  item: Item;
  product: KitProduct | null;
  dataDispatch: "SET_DATA_1" | "SET_DATA_2";
}

const Input = ({ item, dataDispatch, product }: InputProps) => {
  const { state, dispatch } = useKitContext();
  const [skuId, setSkuId] = useState<string>("");
  const verifyStyle = dataDispatch === "SET_DATA_1"
    ? state.kitItems[0]
    : state.kitItems[1];

  const styles = `${
    verifyStyle?.id === skuId
      ? "bg-[#bea669] text-white"
      : "bg-white text-[#bea669]"
  }`;

  const listPrice = item.sellers[0].commertialOffer.ListPrice;
  const price = item.sellers[0].commertialOffer.Price;
  const itemLayer = {
    item_id: item.itemId,
    item_group_id: product?.productId,
    quantity: 1,
    coupon: "",
    price,
    discount: Number((price && listPrice ? listPrice - price : 0).toFixed(2)),
    item_name: product?.productName,
    item_variant: item.name,
    item_brand: product?.brand,
    item_url: product?.link,
  };

  const selectItemEvent = useSendEvent({
    on: "change",
    event: {
      name: "select_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [itemLayer],
      },
    },
  });

  return (
    <li>
      <input
        type="checkbox"
        name={item.complementName}
        id={item.itemId}
        class="hidden"
        onChange={() => {
          setSkuId(item.itemId);
          dispatch({
            type: dataDispatch,
            payload: {
              id: item.itemId,
              refId: item.referenceId[0].Value,
              seller: item.sellers[0].sellerId,
              quantity: 1,
              image: item.images[0].imageUrl,
              brand: product?.brand,
              group_id: product?.productId,
              name: product?.productName,
              url: product?.link,
              variant: item.complementName,
              listPrice: item.sellers[0].commertialOffer.ListPrice,
              price: item.sellers[0].commertialOffer.Price,
            },
          });
        }}
      />
      <label
        for={item.itemId}
        class={`w-9 h-9 flex items-center justify-center rounded-full border border-[#bea669] font-source-sans text-sm font-semibold cursor-pointer hover:opacity-80 hover:bg-[#bea669] hover:text-white ${styles} duration-300 ${
          item.sellers[0].commertialOffer.AvailableQuantity === 0
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        {...selectItemEvent}
      >
        {item.Tamanho[0]}
      </label>
    </li>
  );
};

export default function KitItem({ productId, dataDispatch }: Props) {
  const [product, setProduct] = useState<KitProduct | null>();
  const [productOrder, setProductOrder] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/catalog_system/pub/products/search?fq=skuId:${productId}`,
        );
        const data = await response.json();

        setProduct(data[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  const availableProduct = product?.items?.find((item) =>
    item.sellers[0].commertialOffer.AvailableQuantity !== 0
  );

  const listPrice = availableProduct?.sellers[0].commertialOffer.ListPrice;
  const price = availableProduct?.sellers[0].commertialOffer.Price;

  useEffect(() => {
    const categoriasTop = ["top", "blusa", "camisa", "casaco"];

    const categoriasBottom = ["calça", "calcinha", "saia", "short", "calca"];

    const productTop = categoriasTop.includes(
      product?.icone_categoria?.[0] ?? "",
    );

    const productBottom = categoriasBottom.includes(
      product?.icone_categoria?.[0] ?? "",
    );

    setProductOrder(productTop ? 1 : productBottom ? 2 : 0);
  }, [product]);

  return (
    <div
      class={`flex items-start border-b border-[#bea669] pb-5 mb-5 w-full gap-3`}
      data-kit-composition={`${product?.Composição}`}
      style={{ order: `${productOrder}` }}
    >
      {availableProduct?.images?.[0]?.imageUrl
        ? (
          <Image
            src={availableProduct?.images?.[0]?.imageUrl ?? ""}
            alt={product?.productName}
            loading="lazy"
            width={158}
            height={238}
          />
        )
        : (
          <div class="flex justify-center items-center h-[238px] w-[158px]">
            <span class="loading loading-spinner" />
          </div>
        )}
      <div>
        <p class="font-source-sans text-black text-lg tracking-[0.07em]">
          {product?.productName}
        </p>

        <div class="flex gap-3 my-2 mb-5">
          <p class="font-source-sans tracking-[0.07em] text-black leading-6 text-base font-semibold">
            {listPrice !== price && (
              <>
                <span class="line-through text-xs text-gray-400 text-[#979797] font-normal">
                  {formatPrice(listPrice)}
                </span>
                <br />
              </>
            )}
            {formatPrice(price)}
          </p>
        </div>

        <div>
          <p class="mb-1 text-black text-xs font-semibold tracking-[0.07em]">
            Tamanho:
          </p>
          <ul class="flex gap-2 items-center justify-start flex-wrap">
            {product?.items.map((item) => {
              if (item.name === "KIT") {
                return null;
              }
              return (
                <Input
                  item={item}
                  product={product}
                  dataDispatch={dataDispatch}
                />
              );
            })}
          </ul>
        </div>

        <div id="sizebay-container"></div>
      </div>
    </div>
  );
}
