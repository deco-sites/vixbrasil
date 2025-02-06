import { ImageWidget } from "apps/admin/widgets.ts";
import { useComponent } from "site/sections/Component.tsx";
import { LoadVideoProps } from "site/components/media/LoadVideo.tsx";

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

const Video = (
  {
    src,
    mobileSrc,
    url,
    alt,
    target = "_self",
    classes = "",
    thumbnail,
    thumbnailMobile,
    device,
  }: VideoProps,
) => {
  return (
    <div
      style={{
        height: `${device === "desktop" ? "52vw" : "149.6vw"}`,
      }}
      class="w-full"
      id="vixbrasil__video-container"
    >
      <div
        id="thumbnail-container"
        class="relative before:w-full before:h-full before:absolute before:top-0 before:left-0 z-[1]"
        hx-get={useComponent<LoadVideoProps>(
          import.meta.resolve(
            "site/components/media/LoadVideo.tsx",
          ),
          {
            src,
            mobileSrc,
            url,
            alt,
            target,
            classes,
            device,
          },
        )}
        hx-trigger="mouseover"
        hx-target="closest #vixbrasil__video-container"
        hx-swap="innerHTML"
      >
        <img
          src={device === "desktop" ? thumbnail : thumbnailMobile}
          alt={alt}
          class="w-full h-full object-cover"
          width={device === "desktop" ? 1920 : 540}
          height={device === "desktop" ? 950 : 800}
        />
      </div>
    </div>
  );
};
export default Video;
