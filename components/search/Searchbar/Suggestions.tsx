import { Suggestion } from "apps/commerce/types.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import Slider from "../../ui/Slider.tsx";
import { ACTION, NAME } from "./Form.tsx";
import { type Resolved } from "@deco/deco";
import SearchProduct from "./SearchProduct.tsx";
export interface Props {
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
}
export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;
  const form = await req.formData();
  const query = `${form.get(NAME ?? "q")}`;
  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;
  return { suggestion };
};
export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;
  const query = new URL(req.url).searchParams.get(NAME ?? "q");
  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;
  return { suggestion };
};
function Suggestions(
  { suggestion }: ComponentProps<typeof loader, typeof action>,
) {
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products?.length);
  const hasTerms = Boolean(searches.length);

  return (
    <div
      class={clx(
        `overflow-y-scroll`,
        !hasProducts && !hasTerms && "opacity-0 invisible",
      )}
    >
      <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[0.25fr_1fr] px-5 pt-5 fixed bg-white top-full left-0 w-full opacity-0 invisible group-hover/header:opacity-100 group-hover/header:visible duration-200">
        <div class="flex flex-col gap-6 border-r border-[#eee] pr-5 mb-5">
          <span
            class="font-source-sans text-sm font-semibold uppercase"
            role="heading"
            aria-level={3}
          >
            Sugestões
          </span>
          <ul class="flex flex-col gap-6 lg:overflow-y-auto overflow-y-scroll lg:max-h-[none] max-h-20">
            {searches.map(({ term }) => (
              <li>
                {/* TODO @gimenes: use name and action from searchbar form */}
                <a
                  href={`${ACTION}?${NAME}=${term}`}
                  class="flex gap-4 items-center font-source-sans text-xs font-semibold uppercase"
                >
                  <span dangerouslySetInnerHTML={{ __html: term }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="flex flex-col pt-6 md:pt-0 px-5 gap-6 overflow-x-hidden">
          <span
            class="font-source-sans  text-sm font-semibold uppercase"
            role="heading"
            aria-level={3}
          >
            {searches?.[0].term
              ? `Produtos para ${searches?.[0].term}`
              : "Produtos"}
          </span>
          <Slider class="carousel gap-3">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class="carousel-item min-w-[200px] max-w-[260px] w-full"
              >
                <SearchProduct
                  product={product}
                  index={index}
                  itemListName="Suggeestions"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
export default Suggestions;
