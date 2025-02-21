import { useKitContext } from "./context/index.tsx";
import { formatPrice } from "../../../sdk/format.ts";

function AddKitToCart() {
  const { state } = useKitContext();

  const handleAddToCart = () => {
    if (state.kitItems) {
      window.STOREFRONT.CART.addToCart(
        state.kitItems.map((sku) => {
          return {
            image: sku.image,
            item_brand: sku.brand,
            item_group_id: sku.group_id,
            item_id: sku.id,
            refId: sku.refId,
            item_name: sku.name ?? "",
            item_url: sku.url,
            item_variant: sku.variant,
            listPrice: sku.listPrice,
            price: sku?.price,
            quantity: sku.quantity,
          };
        }),
        {
          allowedOutdatedData: ["paymentData"],
          orderItems: state.kitItems.map((sku) => {
            return {
              id: sku.id,
              seller: sku.seller || "",
              quantity: 1,
            };
          }),
        },
      );

      setTimeout(() => {
        const openMinicart = globalThis?.document?.querySelector(
          "#minicart-drawer",
        ) as HTMLLabelElement;
        openMinicart?.click();
      }, 1000)
    }
  };

  const SelectProducts = () => {
    const price_1 = state.kitItems?.[0]?.price ?? 0;
    const price_2 = state.kitItems?.[1]?.price ?? 0;

    return (
      <p class="font-source-sans text-black text-sm tracking-[0.07em] text-center my-4">
        Selecionado:{" "}
        <span class="font-semibold text-[#bea669]">
          {state.kitItems.length > 1 ? "2 produtos" : "1 produto"}
        </span>{" "}
        <b class="font-semibold">
          {formatPrice(price_1 + price_2)}
        </b>
      </p>
    );
  };

  return (
    <div>
      {state.kitItems.length
        ? <SelectProducts />
        : (
          <p class="font-source-sans text-black text-sm tracking-[0.07em] text-center my-4">
            Escolha um tamanho
          </p>
        )}

      <button
        type="button"
        onClick={() => handleAddToCart()}
        class={`lg:hidden block z-50 fixed bottom-0 left-0 tracking-[0.07em] font-source-sans uppercase text-[#f7f4ed] font-normal w-full pt-[0.5em] pb-[0.64em]  duration-200  ${
          state.kitItems.length === 0
            ? "bg-[#ccc] cursor-not-allowed"
            : "bg-black hover:bg-[#bea669]"
        }`}
      >
        Adicionar à sacola
      </button>
      <button
        type="button"
        onClick={() => handleAddToCart()}
        class={`tracking-[0.07em] font-source-sans uppercase text-[#f7f4ed] font-normal w-full pt-[0.5em] pb-[0.64em]  duration-200 bg-black ${
          state.kitItems.length === 0
            ? "opacity-20 cursor-not-allowed"
            : " hover:bg-[#bea669]"
        }`}
      >
        Adicionar à sacola
      </button>
    </div>
  );
}
export default AddKitToCart;
