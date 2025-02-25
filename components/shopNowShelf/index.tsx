import { ShopNowShelfItems } from "../../islands/ShelfProducts/index.tsx";
import ShelfProducts from "../../islands/ShelfProducts/index.tsx";
import { ShopNowShelfFunctions } from "./functions.js";
import { useScript } from "site/sdk/useScript.ts";
export interface ShopNowShelfProps {
  /** @title Shop Now */
  items: ShopNowShelfItems[];
}

export const ShopNowShelfComponent = ({ items }: ShopNowShelfProps) => {
  return (
    <div class="3xl:px-28 sm:px-22 px-[15px] lg:mt-12 mt-8 lg:mb-4 mb-8">
      <div class="shop-now-shelf__slider w-full">
        {items.map((item) => {
          return (
            <div>
              <ShelfProducts
                src={item.src}
                alt={item.alt}
                products={item.products}
              />
            </div>
          );
        })}
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(ShopNowShelfFunctions) }}
      />
    </div>
  );
};
