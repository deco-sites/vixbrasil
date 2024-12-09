import { useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { ShopNowShelfItems } from "../../../islands/ShelfProducts/index.tsx";
import Icon from "../../ui/Icon.tsx";
import KitItem from "./KitItem.tsx";
import AddKitToCart from "./AddKitToCart.tsx";

const ProductPopUp = (
  { active, setActive, products, title }: {
    active: boolean;
    setActive: (value: boolean) => void;
    products: string[];
    title: string;
  },
) => {
  return (
    <div
      class={`${
        active ? "flex" : "hidden"
      } fixed z-50 top-0 left-0  items-center justify-center h-screen w-screen`}
    >
      <div class="absolute z-10 bg-white lg:w-auto w-[98vw]">
        <div class="relative flex justify-center ">
          <button
            onClick={() => setActive(false)}
            class="absolute top-2 right-2 text-black hover:text-[#bea669] duration-200 cursor-pointer"
          >
            <Icon id="close" size={28} />
          </button>

          <h2 class="font-source-sans text-[#bea669] text-2xl text-center py-10">
            {title}
          </h2>
        </div>
        <div class="flex items-start m-6">
          {products.map((item, index) => {
            const dataDispatch = index === 0 ? "SET_DATA_1" : "SET_DATA_2";

            return <KitItem productId={item} dataDispatch={dataDispatch} />;
          })}
        </div>
        <AddKitToCart />
      </div>
      <span
        onClick={() => setActive(false)}
        class="absolute bg-black top-0 left-0 h-screen w-screen opacity-50"
      />
    </div>
  );
};

export default function ShelfProducts(
  { src, alt, products }: ShopNowShelfItems,
) {
  const [active, setActive] = useState(false);

  return (
    <div class="relative">
      <div
        onClick={() => {
          setActive(true);
        }}
        class="lg:p-4 p-1 after:duration-200 font-source-sans text-white font-bold relative after:content-['Shop_Now'] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:flex after:justify-center after:items-center after:opacity-0 hover:after:opacity-100 after:bg-bronze-opacity"
      >
        <img src={src} alt={alt} width={"auto"} height={"auto"} />
      </div>

      {active &&
        createPortal(
          <ProductPopUp
            active={active}
            setActive={setActive}
            products={products}
            title={alt}
          />,
          document.body,
        )}
    </div>
  );
}
