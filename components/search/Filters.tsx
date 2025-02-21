import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import Icon from "../ui/Icon.tsx";
import { useDevice } from "@deco/deco/hooks";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox border-orange-400 [--chkbg:#bea669] checked:border-[#bea669] w-4 h-4 rounded"
      />
      <span class="font-source-sans text-sm text-black">{label}</span>
      {quantity > 0 && (
        <span class="font-source-sans text-sm text-black">({quantity})</span>
      )}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const device = useDevice();

  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul
      tabIndex={0}
      class={clx(
        `filters-department menu flex gap-2 z-20 sm:py-8 py-4 !flex-nowrap`,
        "sm:max-h-[200px] sm:min-w-[345px] bg-white overflow-auto",
        device === "desktop" &&
          "dropdown-content px-10 mt-8 shadow-custom-light ",
        flexDirection,
      )}
    >
      {values.map((item) => {
        const { url, selected, value } = item;

        if (avatars) {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} key={item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex gap-6 p-4 sm:p-0 sm:flex-row flex-col">
      {filters
        .filter(isToggle)
        .map((filter) => {
          if (!["Cor", "Tamanho"].includes(filter.label)) {
            return null;
          }
          return (
            <li>
              <div class="dropdown group/filters flex flex-col gap-4">
                <div
                  tabIndex={0}
                  role="button"
                  class="list-none flex items-center gap-4 font-source-sans text-left text-sm tracking-[0.98px] uppercase font-normal cursor-pointer"
                >
                  {filter.label}

                  <span>
                    <Icon
                      id="sm-arrow"
                      size={10}
                      class="group-open/filters:rotate-[-90deg] rotate-90 duration-200"
                    />
                  </span>
                </div>
                <FilterValues {...filter} />
              </div>
            </li>
          );
        })}
    </ul>
  );
}
function FiltersMobile({ filters }: Props) {
  return (
    <ul class="flex p-4 sm:p-0 sm:flex-row flex-col">
      {filters
        .filter(isToggle)
        .map((filter) => {
          if (!["Cor", "Tamanho"].includes(filter.label)) {
            return null;
          }
          return (
            <li>
              <details class="collapse group/filters flex flex-col gap-4">
                <summary class="collapse-title list-none !flex items-center justify-between gap-4 font-source-sans text-left text-sm tracking-[0.98px] uppercase font-normal cursor-pointer p-4">
                  {filter.label}

                  <span>
                    <Icon
                      id="sm-arrow"
                      size={10}
                      class="group-open/filters:rotate-[-90deg] rotate-90 duration-200"
                    />
                  </span>
                </summary>
                <div class="collapse-content">
                  <FilterValues {...filter} />
                </div>
              </details>
            </li>
          );
        })}
    </ul>
  );
}

export { Filters, FiltersMobile };
