import BannerVideoComponent, {
  BannerVideoProps,
} from "../../components/bannerVideo/index.tsx";
import Section from "../../components/ui/Section.tsx";

export const LoadingFallback = () => <Section.Placeholder height="52vw" />;

export default function BannerVideo({ bannerVideo }: BannerVideoProps) {
  return (
    <Section.Container>
      <BannerVideoComponent bannerVideo={bannerVideo} />
    </Section.Container>
  );
}
