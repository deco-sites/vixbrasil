import { Image, ImageProps } from "../media/Image.tsx";
import VideoComponent from "../../islands/VideoIsland.tsx";
import { VideoProps } from "../media/Video.tsx";
import Slider from "../ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";

export interface BannerVideoProps {
  /** @title Banner de Vídeo ou Imagem */
  bannerVideo: ImageOrVideo[];
}

/** @titleBy alt */
type ImageOrVideo = ImageProps | VideoProps;
export default function BannerVideoComponent(
  { bannerVideo }: BannerVideoProps,
  { id = useId() },
) {
  const container = `${id}-banner-video--home`;
  const device = useDevice();

  return (
    <div>
      <div
        id={container}
        class="relative"
      >
        <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
          {bannerVideo?.map((item: ImageOrVideo, index) => {
            if (item.type === "image") {
              return (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full h-full justify-center items-center"
                >
                  <Image
                    type="image"
                    src={item.src}
                    mobileSrc={item.mobileSrc}
                    alt={item.alt}
                    url={item.url}
                    target={item.target}
                    width={1920}
                    height={900}
                    classes="lg:h-full h-[148.5vw] min-w-[195px] lg:min-w-0"
                    classesLink="w-full"
                  />
                </Slider.Item>
              );
            }
            return (
              <Slider.Item
                index={index}
                class="carousel-item w-full h-full justify-center items-center"
              >
                <VideoComponent
                  type="video"
                  src={item.src}
                  mobileSrc={item.mobileSrc}
                  alt={item.alt}
                  url={item.url}
                  target={item.target}
                  thumbnail={item.thumbnail}
                  thumbnailMobile={item.thumbnailMobile}
                  device={device}
                  // classes="lg:w-full !w-[300%] translate-x-[-33%] lg:translate-x-0"
                />
              </Slider.Item>
            );
          })}
        </Slider>
        {bannerVideo?.length > 1 && (
        <>
        <Slider.PrevButton
          class="banner-video__slider--arrow banner-video__slider--arrow--prev"
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
            <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="white"></path>
          </svg>
        </Slider.PrevButton>

        <Slider.NextButton
          class="banner-video__slider--arrow banner-video__slider--arrow--next"
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
            <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="white"></path>
          </svg>
        </Slider.NextButton>
            </>
        )}
      </div>

      <Slider.JS
        rootId={container}
        interval={8000}
        scroll="auto"
        infinite
      />
    </div>
  );
}
