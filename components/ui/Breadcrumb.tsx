import type { BreadcrumbList } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"] | BreadcrumbManual[];
}

interface BreadcrumbManual {
  name: string;
  /** @title Link */
  item: string;
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Início", item: "/" }, ...itemListElement];

  return (
    <div class="font-source-sans text-sm tracking-[0.07em] font-light xl:px-14 px-5 ">
      <ul class="flex items-center max-w-full overflow-auto">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index) => {
            return (
              <li
                class={`${
                  index === 0 ? "" : "list-disc ml-6 marker:text-[9px]"
                } py-1 px-0.5 text-black hover:text-[#bea669] duration-150 whitespace-nowrap`}
              >
                <a href={relative(item)} class="no-underline">{name}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Breadcrumb;
