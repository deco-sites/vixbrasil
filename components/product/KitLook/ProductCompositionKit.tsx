import { useEffect, useState } from "preact/hooks";
import { KitProduct } from "./types.ts";

export interface ProductCompositionKitProps {
  productId: string;
}

export default function ProductCompositionKit(
  { productId }: ProductCompositionKitProps,
) {
  const [product, setProduct] = useState<KitProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/catalog_system/pub/products/search?fq=skuId:${productId}`,
        );
        const data = await response.json();

        setProduct(data[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div>
      <span class="text-sm">
        {product && (
          <details class="group/product-infos border-[#d8caa5] border-b">
            <summary class="cursor-pointer pl-2 flex items-center justify-between font-source-sans font-semibold text-sm tracking-[0.07em] after:content-['+'] after:p-3 after:font-semibold after:text-lg group-open/product-infos:after:content-['-'] group-open/product-infos:bg-[#f7f4ed] mt-4 duration-200">
              Composição
            </summary>
            <div
              class="ml-2 mt-2 font-source-sans font-semibold text-sm tracking-[0.07em] overflow-hidden px-2 py-4 group-open/product-infos:animation-dropdown duration-200"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: product?.Composição[0] ?? "" }}
            />
          </details>
        )}
      </span>
    </div>
  );
}
