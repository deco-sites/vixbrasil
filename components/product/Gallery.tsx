import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { ImageZoom } from "../media/ImageZoom.tsx";
import ProductImageZoom from "./function.js";
import { useDevice } from "@deco/deco/hooks";
import { useScript } from "site/sdk/useScript.ts";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}
const WIDTH = 508;
const HEIGHT = 768;
const WIDTH_MOBILE = 374;
const HEIGHT_MOBILE = 565;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;
/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }
  const {
    page: { product: { name, isVariantOf, image: pImages, video: pVideos } },
  } = props;
  // Filter images when image's alt text matches product name
  // More info at: https://community.shopify.com/c/shopify-discussions/i-can-not-add-multiple-pictures-for-my-variants/m-p/2416533
  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const filtered = groupImages.filter((img) =>
    name?.includes(img.alternateName || "")
  );
  const imagesFiltered = filtered.length > 0 ? filtered : groupImages;
  const images = imagesFiltered.filter((item) => item.name !== "IMAGEM1");

  const device = useDevice();

  const videos = pVideos?.map((item) => item.contentUrl).join("");
  const match = videos?.match(/video\/(\d+)/);
  const videoId = match ? match[1] : null;
  return (
    <>
      <div
        id={id}
        class="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-[min-content_1fr] gap-10 2xl:mr-14 mb-3 xl:mb-0"
      >
        {/* Image Slider */}
        <div class="col-start-1 col-span-1 sm:col-start-2">
          <div class="relative h-min flex-grow">
            <Slider class="carousel carousel-center gap-6 w-full">
              {images.map((img, index) => {
                if (index === 1 && videoId) {
                  return (
                    <>
                      <Slider.Item index={index} class="carousel-item w-full">
                        <div
                          class="max-w-[507px] mx-auto relative h-[768px] flex justify-center"
                          style={{
                            maxWidth: `${
                              device === "desktop" ? WIDTH : WIDTH_MOBILE
                            }px`,
                            maxHeight: `${
                              device === "desktop" ? HEIGHT : HEIGHT_MOBILE
                            }px`,
                          }}
                        >
                          <span class="absolute w-full h-full z-10 top-0 left-0 cursor-pointer" />
                          <iframe
                            src={`https://player.vimeo.com/video/${videoId}?h=6fcbaad96d&title=0&byline=0&portrait=0&background=1&muted=1&controls=0&autoplay=1&playsinline=1`}
                            width={device === "desktop" ? WIDTH : WIDTH_MOBILE}
                            height={device === "desktop"
                              ? HEIGHT
                              : HEIGHT_MOBILE}
                            frameborder="0"
                            allow="autoplay; fullscreen; picture-in-picture; muted"
                            title="VW252130_2549_1"
                          >
                          </iframe>
                        </div>
                      </Slider.Item>
                      <Slider.Item
                        index={index + 1}
                        class="carousel-item w-full"
                      >
                        <ImageZoom
                          classes="w-full h-full"
                          aspect={ASPECT_RATIO}
                          src={img.url!}
                          alt={img.alternateName}
                          width={device === "desktop" ? WIDTH : WIDTH_MOBILE}
                          height={device === "desktop" ? HEIGHT : HEIGHT_MOBILE}
                          preload={false}
                          loading={"lazy"}
                          num={index + 1}
                          qtt={images.length}
                        />
                      </Slider.Item>
                    </>
                  );
                }
                return (
                  <Slider.Item
                    index={index !== 0 && videoId ? index + 1 : index}
                    class="carousel-item w-full"
                  >
                    <ImageZoom
                      classes="w-full h-full"
                      aspect={ASPECT_RATIO}
                      src={img.url!}
                      alt={img.alternateName}
                      width={device === "desktop" ? WIDTH : WIDTH_MOBILE}
                      height={device === "desktop" ? HEIGHT : HEIGHT_MOBILE}
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      num={index + 1}
                      qtt={images.length}
                    />
                  </Slider.Item>
                );
              })}
            </Slider>
          </div>
        </div>

        {/* Dots */}
        {device === "desktop" && (
          <div class="col-start-1 col-span-1 min-w-36">
            <div
              className={`dots-container--prev flex justify-center p-2.5`}
              role="button"
              tabIndex={0}
            >
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 7L7 1L1 7"
                  stroke="#BEA669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <ul
              class={clx(
                "dots-container",
                "max-h-[720px]",
                "carousel carousel-center",
                "sm:carousel-vertical",
                "gap-2",
                "max-w-full",
                "overflow-x-auto",
                "sm:overflow-y-auto",
              )}
            >
              {images.map((img, index) => {
                if (index === 1 && videoId) {
                  return (
                    <>
                      <li class="carousel-item max-w-40 max-h-64 w-full h-full">
                        <Slider.Dot
                          index={index}
                          class="border-[2px] border-transparent"
                        >
                          <div
                            class="object-cover w-full h-full max-w-[133px] max-h-[171px] relative"
                            style={{ aspectRatio: "133 / 171" }}
                          >
                            <span class="absolute w-full h-full z-10 top-0 left-0 cursor-pointer" />
                            <iframe
                              src={`https://player.vimeo.com/video/${videoId}?h=6fcbaad96d&title=0&byline=0&portrait=0&background=1&muted=1&controls=0&autoplay=1&playsinline=1`}
                              width="133"
                              height="171px"
                              frameborder="0"
                              allow="autoplay; fullscreen; picture-in-picture; muted"
                              title="VW252130_2549_1"
                            >
                            </iframe>
                          </div>
                        </Slider.Dot>
                      </li>
                      <li class="carousel-item max-w-40 max-h-64 w-full h-full">
                        <Slider.Dot
                          index={index + 1}
                          class="border-[2px] border-transparent"
                        >
                          <Image
                            style={{ aspectRatio: "133 / 171" }}
                            class="object-cover w-full h-full max-w-[133px] max-h-[171px]"
                            width={133}
                            height={171}
                            src={img.url!}
                            alt={img.alternateName}
                          />
                        </Slider.Dot>
                      </li>
                    </>
                  );
                }
                return (
                  <li class="carousel-item max-w-40 max-h-64 w-full h-full">
                    <Slider.Dot
                      index={index !== 0 && videoId ? index + 1 : index}
                      class="border-[2px] border-transparent"
                    >
                      <Image
                        style={{ aspectRatio: "133 / 171" }}
                        class="object-cover w-full h-full max-w-[133px] max-h-[171px]"
                        width={133}
                        height={171}
                        src={img.url!}
                        alt={img.alternateName}
                      />
                    </Slider.Dot>
                  </li>
                );
              })}
            </ul>
            <div
              className={`dots-container--next flex justify-center p-2.5`}
              role="button"
              tabIndex={0}
            >
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="#BEA669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        <Slider.JS rootId={id} />
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(ProductImageZoom),
        }}
      />
    </>
  );
}
