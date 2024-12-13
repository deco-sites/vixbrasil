import { useDevice } from "@deco/deco/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
/** @title Imagem */
export interface ImageProps {
  /** @hide true */
  type: "image";
  src: ImageWidget;
  mobileSrc: ImageWidget;
  url: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  target: "_blank" | "_self";
  /** @hide true */
  classes?: string;
  /** @hide true */
  classesLink?: string;
}
export const Image = (
  {
    src,
    mobileSrc,
    url,
    alt,
    target = "_self",
    classes = "",
    classesLink = "",
    width = "auto",
    height = "auto",
  }: ImageProps,
) => {
  const device = useDevice();
  return (
    <a href={url} target={target} class={`${classesLink}`}>
      <img
        src={device === "desktop" ? src : mobileSrc}
        alt={alt}
        width={width}
        height={height}
        class={`w-full object-cover ${classes}`}
        loading="lazy"
      />
    </a>
  );
};
