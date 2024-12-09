import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */

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
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
