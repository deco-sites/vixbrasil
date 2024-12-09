import {
  ShopNowShelfComponent,
  ShopNowShelfProps,
} from "../../components/shopNowShelf/index.tsx";
import Section from "../../components/ui/Section.tsx";

export default function ShopNowShelf({ items }: ShopNowShelfProps) {
  return (
    <Section.Container>
      <ShopNowShelfComponent items={items} />
    </Section.Container>
  );
}
