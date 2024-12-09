import ShelfProducts from "../../components/shopNowShelf/ShelfProducts/index.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { ShelfProductsProvider } from "./context/index.tsx";

/** @titleBy alt */
export interface ShopNowShelfItems {
  src: ImageWidget;
  alt: string;
  products: string[];
}

export default function Island(props: ShopNowShelfItems) {
  return (
    <ShelfProductsProvider>
      <ShelfProducts {...props} />
    </ShelfProductsProvider>
  );
}
