import { useState } from "preact/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
/** @titleBy alt */
export interface VideoProps {
  /** @readOnly true */
  type: "video";
  src: string;
  mobileSrc: string;
  url: string;
  alt: string;
  thumbnail: ImageWidget;
  target: "_blank" | "_self";
  /** @hide true */
  classesContainer?: string;
  /** @hide true */
  classes?: string;
}
export const Video = (
  { src, mobileSrc, url, alt, target = "_self", classes = "", thumbnail }:
    VideoProps,
) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div
      style={{
        height: `${globalThis.window.innerWidth > 1024 ? "52vw" : "148.5vw"}`,
      }}
      class="w-full"
    >
      {!isVideoLoaded
        ? (
          <div
            class=" relative before:w-full before:h-full before:absolute before:top-0 before:left-0 z-[1]"
            onMouseOver={handlePlayClick}
          >
            <img
              src={thumbnail}
              alt={alt}
              class="w-full h-full object-cover"
              width={globalThis.window.innerWidth > 1024 ? 1920 : 540}
              height={globalThis.window.innerWidth > 1024 ? 950 : 800}
            />
          </div>
        )
        : (
          <a
            href={url}
            target={target}
            class=" relative before:w-full before:h-full before:absolute before:top-0 before:left-0 z-[1]"
          >
            <iframe
              src={`https://player.vimeo.com/video/${
                globalThis.window.innerWidth > 1024 ? src : mobileSrc
              }?title=0&byline=0&portrait=0&muted=1&autoplay=1&autopause=0&controls=0&loop=1&app_id=122963`}
              width={`${globalThis.window.innerWidth > 1024 ? "426" : "240"}`}
              height={`${globalThis.window.innerWidth > 1024 ? "218" : "0"}`}
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title={alt}
              data-ready="true"
              class={`${classes}`}
              style="width: 100%; height: 100%;"
            />
          </a>
        )}
    </div>
  );
};
