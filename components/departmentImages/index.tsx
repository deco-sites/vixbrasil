import { useId } from "../../sdk/useId.ts";
import { Image, ImageProps } from "../media/Image.tsx";
import Slider from "../ui/Slider.tsx";

export type DepartmentImagesProps = {
  /** @title Imagens de Departamento */
  items: ImageProps[];
};
export const DepartmentImages = (
  { items }: DepartmentImagesProps,
  { id = useId() },
) => {
  const container = `${id}-department-images`;

  return (
    <div
      id={container}
      class="w-[calc(100% - 8px)] lg:mt-8 mt-4 lg:mb-12 mb-8 relative max-w-[1660px] mx-auto"
    >
      <Slider class="carousel carousel-center col-span-full col-start-1 row-start-1 row-span-full h-full w-full gap-4 px-4">
        {items?.map((item, index) => {
          return (
            <Slider.Item
              index={index}
              class="max-h-[580px] lg:w-1/4 w-full overflow-hidden carousel-item"
            >
              <Image
                type="image"
                src={item.src}
                mobileSrc={item.mobileSrc}
                alt={item.alt}
                url={item.url}
                width={580}
                height={800}
                target={item.target}
                classes="hover:scale-[1.05] duration-200 lg:mx-0 mx-1.5 !object-contain"
              />
            </Slider.Item>
          );
        })}
      </Slider>
      {items.length > 4 &&
        (
          <>
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
                <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="black">
                </path>
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
                <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="black">
                </path>
              </svg>
            </Slider.NextButton>

            <ul class="col-span-full row-start-4 z-10 carousel justify-center gap-3 w-full sm:inline-flex hidden">
              {items
                .map((_, index) => {
                  return (
                    <li
                      class="carousel-item hidden itemDotsDepartment"
                      key={index}
                    >
                      <Slider.Dot
                        index={index}
                        class="bg-black opacity-20 h-3 w-3 no-animation rounded-full disabled:bg-[#bea669] disabled:opacity-100 transition-[width] cursor-pointer"
                      />
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      <Slider.JS rootId={container} infinite />
    </div>
  );
};
