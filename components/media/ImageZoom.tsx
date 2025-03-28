import { Head } from "$fresh/runtime.ts";

/** @titleBy alt */
export interface ImageProps {
  src: string;
  alt?: string;
  width: string | number;
  height: string | number;
  num: string | number;
  qtt: string | number;
  /** @hide true */
  classes?: string;
  aspect?: string;
  preload: boolean;
  loading: "lazy" | "eager";
}

export const ImageZoom = (
  {
    src,
    alt,
    width = 508,
    height = 768,
    num,
    qtt,
    aspect,
    preload = false,
    loading = "lazy",
    classes = "",
  }: ImageProps,
) => {
  return (
    <>
      {preload && (
        <Head>
          <link as="image" rel="preload" href={src} />
        </Head>
      )}

      <div
        style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
        class={`imageZoom--wrapper max-w-[${width}px] w-full max-h-[${height}px] h-full overflow-hidden relative`}
      >
        <img
          type="image"
          width={width}
          height={height}
          loading={loading}
          style={aspect && { aspectRatio: aspect }}
          src={src}
          alt={alt}
          class={`imageZoom--image ${classes} object-cover cursor-crosshair`}
        />

        <span class="absolute font-source-sans right-0 bottom-0 w-10 h-5 text-white pt-0.5 text-sm text-center bg-bronze-opacity lg:hidden">
          {num}/{qtt}
        </span>
      </div>
    </>
  );
};
