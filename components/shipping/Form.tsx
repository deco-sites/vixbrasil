import type { SKU } from "apps/vtex/utils/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="w-auto mr-5 font-medium tracking-[0.07em] text-sm font-source-sans">
            Calcule o frete e prazo de entrega:
          </span>
        </div>

        <form
          class="relative flex items-center justify-between w-[300px] h-10 rounded-none border-b border-[#d8caa5] bg-[#f9f9f9]"
          hx-target={`#${slot}`}
          hx-swap="innerHTML"
          hx-sync="this:replace"
          hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
            items,
          })}
        >
          <input
            as="input"
            type="text"
            class="font-source-sans text-base bg-transparent w-full pl-4 focus:outline-0 placeholder:font-source-sans placeholder:text-base placeholder:text-black"
            placeholder="00000-000"
            name="postalCode"
            maxLength={9}
            size={9}
          />
          <button type="submit" class="">
            <span class="[.htmx-request_&]:hidden inline font-source-sans font-medium text-base underline p-4 hover:text-[#bea669] duration-200">
              Ok
            </span>
            <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
          </button>
        </form>
      </div>
      <div>
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
          target="_blank"
          class="block text-right text-[#bea669] text-xs underline py-3 w-full"
        >
          Não sei meu CEP
        </a>
      </div>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}
