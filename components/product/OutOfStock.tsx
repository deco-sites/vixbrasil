import type { Product } from "apps/commerce/types.ts";
import { AppContext } from "../../apps/site.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  productID: Product["productID"];
}

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const form = await req.formData();

  const name = `${form.get("name") ?? ""}`;
  const email = `${form.get("email") ?? ""}`;

  // deno-lint-ignore no-explicit-any
  await (ctx as any).invoke("vtex/actions/notifyme.ts", {
    skuId: props.productID,
    name,
    email,
  });

  return props;
};

export default function Notify({ productID }: Props) {
  return (
    <form
      class="form-control justify-start gap-2"
      hx-sync="this:replace"
      hx-indicator="this"
      hx-swap="none"
      hx-post={useComponent<Props>(import.meta.url, { productID })}
    >
      <span class="text-base font-source-sans">
        Este produto está indisponivel no momento
      </span>
      <span class="text-sm font-source-sans font-light">
        Quero saber quando estiver disponível
      </span>

      <div class="flex items-center justify-between gap-4
      ">
        <input
          placeholder="Nome"
          class="border rounded-lg h-10 pl-2 w-full border-[#e3e4e6]"
          name="name"
        />
        <input
          placeholder="Email"
          class="border rounded-lg h-10 pl-2 w-full border-[#e3e4e6]"
          name="email"
        />

        <button
          type="button"
          class="font-source-sans font-medium text-sm uppercase text-white w-20 h-8 bg-[#bea669] px-4 rounded-lg"
        >
          <span class="[.htmx-request_&]:hidden inline">Enviar</span>
          <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
        </button>
      </div>
    </form>
  );
}
