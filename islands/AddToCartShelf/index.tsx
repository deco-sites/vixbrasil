import AddToCartShelf, {
  AddToCartShelfProps,
} from "../../components/product/shelf/AddToCartShelf/index.tsx";
import { ShelfProvider } from "./context/index.tsx";

function Island(props: AddToCartShelfProps) {
  return (
    <ShelfProvider>
      <AddToCartShelf {...props} />
    </ShelfProvider>
  );
}

export default Island;
