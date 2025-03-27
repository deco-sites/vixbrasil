import { ShopNowShelfItems } from "../../islands/ShelfProducts/index.tsx";
import ShelfProducts from "../../islands/ShelfProducts/index.tsx";
import Slider from "site/components/ui/Slider.tsx";

export interface ShopNowShelfProps {
  /** @title Shop Now */
  items: ShopNowShelfItems[];
}

export const ShopNowShelfComponent = ({ items }: ShopNowShelfProps) => {
  const container = `ShopNowShelfComponent--slider`;

  return (
    <div
      id={container}
      class="3xl:px-28 sm:px-22 px-[15px] lg:mt-12 mt-8 lg:mb-4 mb-8 relative"
    >
      <Slider class="carousel carousel-center col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
        {items.map((item, index) => {
          return (
            <Slider.Item
              index={index}
              class=" lg:w-1/4 w-1/3 overflow-hidden carousel-item"
            >
              <ShelfProducts
                src={item.src}
                alt={item.alt}
                products={item.products}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      <Slider.PrevButton
        class="shop-now__slider--arrow shop-now__slider--arrow--prev"
        disabled={false}
        id={container}
      >
        <svg
          width="12"
          height="18"
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="black"></path>
        </svg>
      </Slider.PrevButton>

      <Slider.NextButton
        class="shop-now__slider--arrow shop-now__slider--arrow--next"
        disabled={false}
        id={container}
      >
        <svg
          width="12"
          height="18"
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="black"></path>
        </svg>
      </Slider.NextButton>

      <ul class="col-span-full row-start-4 z-10 carousel justify-center gap-3 w-full">
        {items
          .map((_, index) => {
            return (
              <li class="carousel-item hidden itemDotsShelf" key={index}>
                <Slider.Dot
                  index={index}
                  class="bg-black opacity-20 h-3 w-3 no-animation rounded-full disabled:bg-[#bea669] disabled:opacity-100 transition-[width] cursor-pointer"
                />
              </li>
            );
          })}
      </ul>

      <Slider.JS rootId={container} infinite />
    </div>
  );
};
