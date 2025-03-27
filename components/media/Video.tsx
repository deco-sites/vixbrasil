import { useEffect, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
/** @title Video */
export interface VideoProps {
  /** @readOnly true */
  type: "video";
  src: string;
  mobileSrc: string;
  url: string;
  alt: string;
  thumbnail: ImageWidget;
  thumbnailMobile: ImageWidget;
  target: "_blank" | "_self";
  /** @hide true */
  classesContainer?: string;
  /** @hide true */
  classes?: string;
  /** @hide true */
  device?: "mobile" | "tablet" | "desktop";
}
const Video = ({
  src,
  mobileSrc,
  url,
  alt,
  target = "_self",
  classes = "",
  thumbnail,
  thumbnailMobile,
  device,
}: VideoProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsVideoLoaded(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (device !== "desktop") {
        setIsVideoLoaded(true);
      }
    }, 1000);
  }, []);

  return (
    <div
      style={{
        height: `${device === "desktop" ? "52vw" : "149.6vw"}`,
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
              src={device === "desktop" ? thumbnail : thumbnailMobile}
              alt={alt}
              class="w-full h-full object-cover"
              width={globalThis?.window?.innerWidth > 1024 ? 1920 : 540}
              height={globalThis?.window?.innerWidth > 1024 ? 950 : 800}
            />
          </div>
        )
        : (
          <div class=" relative w-full h-full">
          <a
            href={url}
            target={target}
            class="w-full h-full absolute top-0 left-0 z-10"
          >
          </a>
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
            <h1>Teste</h1>
          </div>
        )}
    </div>
  );
};
export default Video;
