import { Image, ImageProps } from "../../components/media/Image.tsx";
import Section from "../../components/ui/Section.tsx";

export default function Banner(
  { src, mobileSrc, url, alt, target = "_self" }: ImageProps,
) {
  return (
    <Section.Container>
      <Image
        type="image"
        src={src}
        mobileSrc={mobileSrc}
        url={url}
        alt={alt}
        target={target}
      />
    </Section.Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
