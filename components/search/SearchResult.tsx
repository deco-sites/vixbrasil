import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductCard from "../product/shelf/ProductCard.tsx";
import { Filters, FiltersMobile } from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";
import Drawer from "../ui/Drawer.tsx";
import Sort from "./Sort.tsx";
import { useDevice, useScript, useSection } from "@deco/deco/hooks";
import { type SectionProps } from "@deco/deco";
import { RichText } from "apps/admin/widgets.ts";

/**
 * @titleBy matcher
 */
export interface SeoTextProps {
  /** @description URL de renderização do texto */
  matcher: string;

  text?: RichText;
  seoText?: RichText;
}
export interface Layout {
  /**
   * @title Pagination
   * @description Format of the pagination
   */
  pagination?: "show-more" | "pagination";
}
export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;

  seo: SeoTextProps[];
  /** @hidden */
  partial?: "hideMore" | "hideLess";
}

const DEFAULT_PROPS = {
  seo: [
    {
      matcher: "/*",
      text: "Texto SEO menor",
      seoText: "Texto SEO footer",
    },
  ],
};

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function fullProductLayout() {
  const getProducts = document.querySelectorAll(
    "#vix__department-products",
  );

  getProducts.forEach((item) => {
    item.setAttribute("data-product-grid", "4");
  });
  globalThis.window.localStorage.setItem("layout-grid", "4");
}

function smallProductLayout() {
  const getProducts = document.querySelectorAll(
    "#vix__department-products",
  );

  getProducts.forEach((item) => {
    item.setAttribute("data-product-grid", "3");
  });
  globalThis.window.localStorage.setItem("layout-grid", "3");
}

function checkLayoutAndUpdate() {
  const getProducts = document.querySelectorAll(
    "#vix__department-products",
  );
  const currentGrid = globalThis.window.localStorage?.getItem("layout-grid");

  if (currentGrid === "4") {
    getProducts.forEach((item) => {
      item.setAttribute("data-product-grid", "4");
    });
    globalThis.window.localStorage.setItem("layout-grid", "4");
  } else if (currentGrid === "3") {
    getProducts.forEach((item) => {
      item.setAttribute("data-product-grid", "3");
    });
    globalThis.window.localStorage.setItem("layout-grid", "3");
  }
}
const useUrlRebased = (overrides: string | undefined, base: string) => {
  let url: string | undefined = undefined;
  if (overrides) {
    const temp = new URL(overrides, base);
    const { searchParams } = temp as URL;
    const final = new URL(base);
    final.pathname = temp.pathname;
    searchParams.forEach((value, key) => {
      final.searchParams.set(key, value);
    });

    url = final.href;
  }
  return url;
};

function updateRecordPerPage(page: ProductListingPage) {
  const productDivs = document.querySelectorAll("#product_shelf");
  const recordPerPage = productDivs.length;
  const records = page?.pageInfo?.records ?? 0;
  const percentage = (recordPerPage / records) * 100;

  document.getElementById("product-counter")!.innerHTML = `
    Você visualizou <span class="text-[#bea669]">${recordPerPage} de ${records}</span> produtos
    <div class="w-[220px] bg-[#eaeaea] mx-auto h-0.5 mb-7 flex">
      <span style="width: ${
    percentage.toFixed(2)
  }%" class="bg-[#bea669] h-0.5"></span>
    </div>`;
}

function SeoSmallText(props: SectionProps<ReturnType<typeof loader>>) {
  const { texts } = props;

  return (
    <div class="max-w-[750px] mx-auto my-4">
      <div
        class="category-seo font-source-sans tracking-[0.07em] leading-4"
        dangerouslySetInnerHTML={{ __html: texts?.text ?? "não foi 1" }}
      />
      <a
        href="#seach-seo"
        class="mt-2 text-black font-source-sans text-xs font-semibold tracking-[0.07em] underline flex items-center justify-center"
      >
        Ler mais
      </a>
    </div>
  );
}

function SeoText(props: SectionProps<ReturnType<typeof loader>>) {
  const { texts } = props;

  return (
    <div
      class="mt-20 py-[60px] bg-[#f7f4eb] w-full flex items-center justify-center"
      id="seach-seo"
    >
      <div
        class="category-seo font-source-sans max-w-[750px] tracking-[0.07em] leading-4"
        dangerouslySetInnerHTML={{ __html: texts?.seoText ?? "não foi 1" }}
      />
    </div>
  );
}

function PageResult(
  { ...props }: SectionProps<typeof loader>,
) {
  const { layout, startingPage = 0, url, partial } = props;
  const page = props.page!;
  const { products, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const nextPageUrl = useUrlRebased(pageInfo.nextPage, url);
  const prevPageUrl = useUrlRebased(pageInfo.previousPage, url);
  const partialPrev = useSection({
    href: prevPageUrl,
    props: { partial: "hideMore" },
  });
  const partialNext = useSection({
    href: nextPageUrl,
    props: { partial: "hideLess" },
  });
  const infinite = layout?.pagination !== "pagination";

  const layoutGrid = globalThis.window.localStorage?.getItem("layout-grid") ??
    "4";

  const results = (
    <div class="flex flex-col items-center justify-center">
      <p
        id="product-counter"
        class="font-source-sans text-xs tracking-[0.07em] text-black text-center"
      >
      </p>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(updateRecordPerPage, page),
        }}
      />
    </div>
  );

  return (
    <div class="grid grid-flow-row grid-cols-1 place-items-center">
      <div
        class={clx(
          "pb-2 sm:pb-10",
          (!prevPageUrl || partial === "hideLess") && "hidden",
        )}
      >
        <a
          rel="prev"
          hx-swap="outerHTML show:parent:top"
          hx-get={partialPrev}
        >
          <span class="inline [.htmx-request_&]:hidden font-source-sans tracking-[0.07em] font-semibold py-2 px-7 border border-black text-black hover:text-[#bea669] hover:border-[#bea669] duration-200 cursor-pointer">
            Ver produtos anteriores
          </span>

          <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
        </a>
      </div>

      <div
        data-product-list
        data-product-grid={layoutGrid}
        id="vix__department-products"
        class={clx(
          "grid items-center",
          " gap-2 sm:gap-2.5",
          "[[data-product-grid='4']&]:sm:grid-cols-4 [[data-product-grid='4']&]:grid-cols-2",
          "[[data-product-grid='3']&]:sm:grid-cols-3 [[data-product-grid='3']&]:grid-cols-1",
          "w-full",
        )}
      >
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(checkLayoutAndUpdate),
          }}
        />
        {products?.map((product, index) => (
          <ProductCard
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            class="h-full min-w-[160px]"
          />
        ))}
      </div>

      <div class={clx("py-2 sm:pt-10 w-full")}>
        {infinite
          ? (
            <>
              <div class="flex justify-center [&_section]:contents">
                <a
                  rel="next"
                  class={clx(
                    (!nextPageUrl || partial === "hideMore") && "!hidden",
                    "flex flex-col items-center justify-center",
                  )}
                  hx-swap="outerHTML show:parent:top"
                  hx-get={partialNext}
                >
                  <div class="block [.htmx-request_&]:hidden">
                    {results}
                  </div>

                  <span class="inline [.htmx-request_&]:hidden font-source-sans tracking-[0.07em] font-semibold py-2 px-7 border border-black text-black hover:text-[#bea669] hover:border-[#bea669] duration-200 cursor-pointer">
                    Ver mais produtos
                  </span>
                  <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
                </a>
              </div>
            </>
          )
          : (
            <div class={clx("join", infinite && "hidden")}>
              <a
                rel="prev"
                aria-label="previous page link"
                href={prevPageUrl ?? "#"}
                disabled={!prevPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="chevron-right" class="rotate-180" />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                rel="next"
                aria-label="next page link"
                href={nextPageUrl ?? "#"}
                disabled={!nextPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="chevron-right" />
              </a>
            </div>
          )}
      </div>
    </div>
  );
}
const setPageQuerystring = (page: string, id: string) => {
  const element = document.getElementById(id)?.querySelector(
    "[data-product-list]",
  );
  if (!element) {
    return;
  }
  new IntersectionObserver((entries) => {
    const url = new URL(location.href);
    const prevPage = url.searchParams.get("page");
    for (let it = 0; it < entries.length; it++) {
      if (entries[it].isIntersecting) {
        url.searchParams.set("page", page);
      } else if (
        typeof history.state?.prevPage === "string" &&
        history.state?.prevPage !== page
      ) {
        url.searchParams.set("page", history.state.prevPage);
      }
    }
    history.replaceState({ prevPage }, "", url.href);
  }).observe(element);
};
function Result(
  props: SectionProps<typeof loader>,
) {
  const container = useId();
  const controls = useId();
  const device = useDevice();
  const { startingPage = 0, url, partial } = props;
  const page = props.page!;
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        // TODO: get category name from search or cms setting
        item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
        item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
        items: page.products?.map((product, index) =>
          mapProductToAnalyticsItem({
            ...(useOffer(product.offers)),
            index: offset + index,
            product,
            breadcrumbList: page.breadcrumb,
          })
        ),
      },
    },
  });

  const sortBy = sortOptions.length > 0 && (
    <Sort sortOptions={sortOptions} url={url} />
  );
  return (
    <>
      <div id={container} {...viewItemListEvent} class="w-full">
        {partial ? <PageResult {...props} /> : (
          <>
            <div class="py-1 bg-[#f9f9f9] flex sm:justify-start justify-center">
              <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
            </div>
            <div class="max-w-[1640px] mx-auto flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5">
              {device === "mobile" && (
                <>
                  <Drawer
                    class="drawer-end z-[999]"
                    id={controls}
                    aside={
                      <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-[80vw]">
                        <div class="flex justify-between items-center border-t-8 border-[#cbb887]">
                          <h1 class="px-4 py-3">
                            <span class="font-medium text- font-source-sans">
                              Filtros
                            </span>
                          </h1>
                          <label for={controls}>
                            <Icon id="close" />
                          </label>
                        </div>
                        <div class="flex-grow overflow-auto">
                          <FiltersMobile filters={filters} />
                        </div>
                      </div>
                    }
                  >
                  </Drawer>
                  <div class="flex sm:hidden justify-between items-center mx-auto w-[313px] h-10 bg-[#bea669] rounded-[19px] top-20 sticky z-30">
                    <label
                      class="w-1/2 flex items-center justify-center gap-2 font-source-sans text-white text-xs tracking-[0.07em]"
                      for={controls}
                    >
                      Filtrar
                      <Icon id="filter-icon" width={22} height={16} />
                    </label>
                    <span class="w-[1px] h-[34px] bg-white"></span>
                    <div class="w-1/2 flex items-center justify-center gap-1 relative">
                      {sortBy}
                    </div>
                  </div>
                </>
              )}

              {device === "desktop" && (
                <div class="flex items-center justify-center">
                  <div class="w-[350px]"></div>
                  <div class="flex flex-col gap-9 mx-auto">
                    <Filters filters={filters} />
                  </div>

                  <div class="w-[350px] flex items-center justify-end">
                    <div class="flex justify-between items-center relative">
                      {sortBy}
                    </div>
                    <div class="flex justify-between items-center gap-3 ml-10">
                      <button
                        class="flex gap-0.5 items-center group/switch-layout"
                        hx-on:click={useScript(fullProductLayout)}
                      >
                        <span class="w-1.5 h-[18px] inline bg-[#d8caa5] group-hover/switch-layout:bg-[#bea669] duration-200" />
                        <span class="w-1.5 h-[18px] inline bg-[#d8caa5] group-hover/switch-layout:bg-[#bea669] duration-200" />
                        <span class="w-1.5 h-[18px] inline bg-[#d8caa5] group-hover/switch-layout:bg-[#bea669] duration-200" />
                        <span class="w-1.5 h-[18px] inline bg-[#d8caa5] group-hover/switch-layout:bg-[#bea669] duration-200" />
                      </button>
                      <button
                        class="flex gap-0.5 items-center group/switch-layout"
                        hx-on:click={useScript(smallProductLayout)}
                      >
                        <span class="w-1.5 h-[18px] inline bg-[#d8caa5] group-hover/switch-layout:bg-[#bea669] duration-200" />
                        <span class="w-1.5 h-[18px] inline bg-[#d8caa5] group-hover/switch-layout:bg-[#bea669] duration-200" />
                        <span class="w-1.5 h-[18px] inline bg-[#d8caa5] group-hover/switch-layout:bg-[#bea669] duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <SeoSmallText {...props} />

              <div class="w-full">
                <PageResult {...props} />
              </div>
            </div>
            <SeoText {...props} />
          </>
        )}
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            setPageQuerystring,
            `${pageInfo.currentPage}`,
            container,
          ),
        }}
      />
    </>
  );
}
function SearchResult({ page, ...props }: SectionProps<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }
  return <Result {...props} page={page} />;
}
export const loader = (props: Props, req: Request) => {
  const { seo } = { ...DEFAULT_PROPS, ...props };
  const texts = seo.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return {
    ...props,
    url: req.url,
    texts,
  };
};
export default SearchResult;
