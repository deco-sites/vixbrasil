import type { BreadcrumbList } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Início", item: "/" }, ...itemListElement];

  return (
    <div class="font-source-sans text-sm tracking-[0.07em] font-light xl:px-14 px-5">
      <ul class="flex items-center">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index) => {
            // if (index === items.length - 1) {
            //   return null;
            // }
            return (
              <li
                class={`${
                  index === 0 ? "" : "list-disc ml-6 marker:text-[9px]"
                } py-1 px-0.5 text-black hover:text-[#bea669] duration-150`}
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
