import { Product } from "apps/commerce/types.ts";
import { clx } from "../../../sdk/clx.ts";
import Icon from "../../ui/Icon.tsx";
import Slider from "../../ui/Slider.tsx";
import ProductCard from "../shelf/ProductCard.tsx";
import { useId } from "../../../sdk/useId.ts";

export interface ProductSliderProps {
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ products, itemListName }: ProductSliderProps) {
  const id = useId();

  return (
    <>
      <div
        id={`${id}--Shelf`}
        class="grid grid-rows-1 max-w-[95vw] mx-auto relative"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1">
          <Slider
            class="carousel carousel-center sm:carousel-end w-full"
            style={{ height: "calc(100% + 130px)" }}
          >
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  // "lg:first:pl-5 first:sm:pl-0",
                  // "last:pr-5 last:sm:pr-0",
                  "lg:w-1/4 w-1/2",
                )}
              >
                <ProductCard
                  index={index}
                  product={product}
                  itemListName={itemListName}
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="flex col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 absolute left-[20px] bottom-[50%] bg-white rounded-full min-w-11 h-11">
          <Slider.PrevButton
            class="disabled:invisible text-black"
            disabled={false}
            id={`${id}--Shelf`}
          >
            <Icon
              id="shelf-arrow"
              size={28}
              class="rotate-[270deg] relative top-[1px] left-[6px]"
            />
          </Slider.PrevButton>
        </div>

        <div class="flex col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 absolute right-[20px] bottom-[50%] bg-white rounded-full min-w-11 h-11">
          <Slider.NextButton
            class="disabled:invisible text-black"
            disabled={false}
            id={`${id}--Shelf`}
          >
            <Icon
              id="shelf-arrow"
              size={28}
              class="rotate-90 relative bottom-[1px] right-[6px]"
            />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={`${id}--Shelf`} infinite />
    </>
  );
}

export default ProductSlider;
