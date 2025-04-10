import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useScript } from "site/sdk/useScript.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { offers } = product;

  const { price = 0, listPrice } = useOffer(offers);

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });
  // deno-lint-ignore no-explicit-any
  const productDetailEvent = (item: any) => {
    const ecommerce = {
      detail: {
        actionField: {
          list: item.item_category2,
        },
        products: [
          {
            brand: item.item_brand,
            category: item.item_category2,
            id: item.item_group_id,
            variant: item.item_id,
            name: item.item_name,
            price: item.price,
            quantity: 1,
          },
        ],
      },
    };

    globalThis?.document?.addEventListener("DOMContentLoaded", function () {
      console.log(`CustomEventData: event view productDetail ready`);
      window?.dataLayer.push({
        event: "productDetail",
        ecommerce: ecommerce,
      });
    });
  };

  const sendEvent = useScript(productDetailEvent, item);

  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />
      <div class="container flex flex-col gap-4 2xl:max-w-[1300px] max-w-[1230px] sm:gap-5 w-full pt-4 sm:pt-5 px-5 sm:px-0">
        <div
          class={clx(
            "grid",
            "grid-cols-1 gap-2 py-0",
            "sm:grid-cols-5 sm:gap-6",
          )}
        >
          <div class="sm:col-span-3">
            <ImageGallerySlider page={page} />
          </div>
          <div class="sm:col-span-2">
            <ProductInfo page={page} />
          </div>
        </div>
      </div>
      <div class="lg:my-[100px] my-[50px]">
        <hr class="w-full text-[#e8e8e8]" />
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: sendEvent }}
      />
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
