import AddKitToCart from "./AddKitToCart.tsx";
import { KitProvider } from "./context/index.tsx";
import KitItem from "./KitItem.tsx";

export interface Props {
  productIdTop: string;
  productIdBottom: string;
}

export default function KitLook({ productIdTop, productIdBottom }: Props) {
  return (
    <KitProvider>
      <KitItem productId={productIdTop} dataDispatch="SET_DATA_1" />
      <KitItem productId={productIdBottom} dataDispatch="SET_DATA_2" />
      <AddKitToCart />
    </KitProvider>
  );
}
