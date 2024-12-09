/**
 * TODO: support other platforms. Currently only for VTEX
 */
import { AppContext } from "apps/vtex/mod.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import { formatPrice } from "../../sdk/format.ts";
import { ComponentProps } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

export async function action(props: Props, req: Request, ctx: AppContext) {
  const form = await req.formData();

  try {
    const result = await ctx.invoke("vtex/actions/cart/simulation.ts", {
      items: props.items,
      postalCode: `${form.get("postalCode") ?? ""}`,
      country: "BRA",
    }) as SimulationOrderForm | null;

    return { result };
  } catch {
    return { result: null };
  }
}

export default function Results({ result }: ComponentProps<typeof action>) {
  const methods = result?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  if (!methods.length) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-2 bg-[#f3f3f3]">
      {methods.map((method) => (
        <li class="grid grid-cols-3 justify-between items-center border-base-200 not-first-child:border-t">
          <span class="font-source-sans text-sm font-normal text-[#727273] text-left">
            {method.name}
          </span>
          <span class="font-source-sans text-sm font-normal text-[#727273] text-center">
            Em até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="font-source-sans text-sm font-normal text-[#727273] text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, "BRL", "pt-BR")
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
