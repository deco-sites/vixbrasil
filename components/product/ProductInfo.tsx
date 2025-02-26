import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import ShareButton from "../shareButton/index.tsx";
import ProductDescriptions from "./ProductDescriptions.tsx";
import KitLook from "../../islands/KitLook.tsx";
import ProductCompositionKit from "../../islands/ProductCompositionKit.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf, isAccessoryOrSparePartFor } = product;
  const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;
  const refId =
    product.additionalProperty?.find((item) => item.name === "RefId") ??
      isVariantOf?.additionalProperty.find((item) => item.name === "RefId");

  const composition =
    product.additionalProperty?.find((item) => item.name === "Composição") ??
      isVariantOf?.additionalProperty.find((item) =>
        item.name === "Composição"
      );

  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
    installments,
  } = useOffer(offers);

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

  //Checks if the variant name is "title"/"default title" and if so, the SKU Selector div doesn't render
  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  const productTop = product.isAccessoryOrSparePartFor?.[1] ?? product;
  const productBottom = product.isAccessoryOrSparePartFor?.[0] ?? product;
  return (
    <div class="flex flex-col" id={id}>
      {/* Product Name */}
      <div class="flex items-start pb-[10px] mb-5 border-b border-[#bea669]">
        <p
          class={clx(
            "text-2xl font-source-sans leading-[34px] tracking-[0.07em] text-black uppercase  relative w-full",
          )}
        >
          {title}
          <br />
          <span
            class={clx(
              "text-[10px] leading-[14px] text-black tracking-normal capitalize",
            )}
          >
            Referência: {refId?.value}
          </span>
        </p>
        <div class="mt-2">
          <WishlistButton item={item} />
          <ShareButton />
        </div>
      </div>

      {/* Sku Selector */}
      {hasValidVariants && isAccessoryOrSparePartFor
        ? (
          <div class="flex flex-col">
            <KitLook
              productIdTop={productTop.sku}
              productIdBottom={productBottom.sku}
            />
          </div>
        )
        : (
          <>
            {/* Prices */}
            <div class="flex gap-3 pt-1">
              <p class="font-source-sans tracking-[0.07em] text-black leading-6 text-base font-semibold">
                {listPrice !== price && (
                  <>
                    <span class="line-through text-xs text-gray-400 text-[#979797] font-normal">
                      {formatPrice(listPrice, offers?.priceCurrency)}
                    </span>
                    <br />
                  </>
                )}
                {formatPrice(price, offers?.priceCurrency)}{" "}
                <span class="text-xs text-gray-400 text-[#979797] font-normal ml-2">
                  {installments}
                </span>
              </p>
            </div>

            <div className="mt-4 sm:mt-8">
              <ProductSelector product={product} />
            </div>

            <div id="sizebay-container"></div>

            {/* Add to Cart and Favorites button */}
            <div class="mt-4 sm:mt-10 flex flex-col gap-2">
              {availability === "https://schema.org/InStock"
                ? (
                  <>
                    <AddToCartButton
                      item={item}
                      seller={seller}
                      product={product}
                      class="lg:hidden block z-50 fixed bottom-0 left-0 tracking-[0.07em] font-source-sans uppercase text-[#f7f4ed] font-normal w-full pt-[0.5em] pb-[0.64em] bg-black hover:bg-[#bea669] duration-200"
                      disabled={false}
                    />
                    <AddToCartButton
                      item={item}
                      seller={seller}
                      product={product}
                      class="tracking-[0.07em] font-source-sans uppercase text-[#f7f4ed] font-normal w-full pt-[0.5em] pb-[0.64em] bg-black hover:bg-[#bea669] duration-200"
                      disabled={false}
                    />
                  </>
                )
                : <OutOfStock productID={productID} />}
            </div>
          </>
        )}

      {/* Shipping Simulation */}
      <div class="mt-8">
        <ShippingSimulationForm
          items={[{ id: Number(product.sku), quantity: 1, seller: seller }]}
        />
      </div>

      {/* Descrição */}
      <ProductDescriptions info={description} title="Descrição do produto" />

      {/* Composição */}
      {hasValidVariants && isAccessoryOrSparePartFor
        ? (
          <ProductCompositionKit
            productId={productTop.sku}
          />
        )
        : (
          <ProductDescriptions
            info={composition?.value}
            title="Composição"
          />
        )}
    </div>
  );
}

export default ProductInfo;
