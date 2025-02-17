import { ProductListingPage } from "apps/commerce/types.ts";
import { useDevice } from "@deco/deco/hooks";
import Icon from "../ui/Icon.tsx";
const SORT_QUERY_PARAM = "order";
const PAGE_QUERY_PARAM = "page";
export type Props = Pick<ProductListingPage, "sortOptions"> & {
  url: string;
};
const getUrl = (href: string, value: string) => {
  const url = new URL(href);
  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);
  return url.href;
};
const labels: Record<string, string> = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamento",
  "discount:desc": "Maior desconto",
};
function Sort({ sortOptions, url }: Props) {
  const device = useDevice();

  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));

  const selectLabel = options.find((item) => item.value === current)?.label;
  return (
    <>
      <label
        for="ordenar-por"
        class="font-source-sans text-sm tracking-[0.07em] whitespace-nowrap text-black font-normal hidden sm:flex items-center uppercase mr-2"
      >
        ordenar por
      </label>
      <div class="dropdown w-full max-w-sm !static">
        <label
          tabIndex={0}
          class="w-full font-source-sans sm:text-sm text-xs tracking-[0.07em] sm:text-[#bea669] text-white sm:font-semibold font-normal sm:uppercase flex items-center justify-center gap-2"
        >
          {device === "desktop"
            ? labels[selectLabel ?? ""] ??
              labels[options[0].label]
            : "Ordenar Por"}

          <Icon
            id="sm-arrow"
            size={10}
            class="group-open/filters:rotate-[-90deg] rotate-90 duration-200 sm:block hidden"
          />
          <Icon
            id="sort-icon"
            width={14}
            height={16}
            class="block sm:hidden"
          />
        </label>
        <ul
          tabIndex={0}
          class="dropdown-content menu  shadow bg-base-100 w-full z-20 sm:left-0 right-0"
        >
          {options.map(({ value, label }) => (
            <li>
              <a
                href={value}
                class={`font-normal font-source-sans text-xs tracking-[0.07em] uppercase text-black sm:py-3 py-2 sm:px-7 px-5 hover:bg-[#e3e4e6] duration-200 cursor-pointer rounded-none sm:border-none border-b border-b-[#e3e4e6] last:border-none ${
                  value === current ? "bg-gray-200" : ""
                } ${selectLabel === label ? "bg-[#e3e4e6]" : ""}`}
              >
                {labels[label] ?? label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Sort;
