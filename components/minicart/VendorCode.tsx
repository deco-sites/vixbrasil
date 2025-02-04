import { MINICART_FORM_ID } from "../../constants.ts";
import Icon from "../ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";

export interface Props {
  vendor?: string;
}

async function handleVendor() {
  const input = document.getElementById("set-vendor-code") as HTMLInputElement;
  const content = {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    method: "GET",
  };

  const req = await fetch(
    `/api/dataentities/VD/search?codigo=${input.value}&_fields=codigo,email,loja,multimarcas,nome,status,isTraining`,
    content,
  );

  req.json()
    // deno-lint-ignore no-explicit-any
    .then(function result(json: any) {
      setTimeout(() => {
        const nameContainer = document.getElementById("vendor-name");

        nameContainer ? nameContainer.innerText = json[0].nome : null;
      }, 500);
      globalThis.window.localStorage.setItem("vendorCode", json[0].codigo);
      globalThis.window.localStorage.setItem("vendorName", json[0].nome);
      globalThis.window.localStorage.setItem(
        "utmiCampaign",
        json[0].isTraining ? "consultora" : "vendedora",
      );
    });
}

function handleName() {
  setTimeout(() => {
    const nameContainer = document.getElementById("vendor-name");

    nameContainer
      ? nameContainer.innerText =
        globalThis.window.localStorage.getItem("vendorName") ?? ""
      : null;
  }, 500);
}

function VendorCode({ vendor }: Props) {
  if (vendor) {
    return (
      <div class="flex justify-between items-center">
        <span class="font-semibold text-xs tracking-[0.07em]">
          Código do Vendedor
        </span>

        <div class="flex items-center w-full max-w-[300px]">
          <p
            id="vendor-name"
            class="p-2 w-full font-source-sans text-sm tracking-[0.07em] text-black opacity-80 focus:outline-none bg-[#f9f9f9] border-b border-[#d8caa5] h-10"
          >
            {globalThis.window.localStorage.getItem("vendorName")
              ? globalThis.window.localStorage.getItem("vendorName")
              : ""}
          </p>

          <label
            form={MINICART_FORM_ID}
            for="vendor-cart"
            hx-trigger="click"
            hx-swap="innerHTML"
            hx-target="this.parentElement"
            class="w-10 h-10 bg-[#bea669] flex justify-center items-center capitalize tracking-[0.07em] font-semibold text-sm text-white cursor-pointer"
            hx-on:click={useScript(handleVendor)}
          >
            <Icon id="trash" size={20} />

            <input
              form={MINICART_FORM_ID}
              name="action"
              value="set-vendor"
              type="checkbox"
              class="hidden"
              id="vendor-cart"
            />
          </label>
        </div>

        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(handleName),
          }}
        />
      </div>
    );
  }
  return (
    <div class="flex justify-between items-center">
      <span class="font-semibold text-xs tracking-[0.07em]">
        Código do Vendedor
      </span>

      <div id="vendor-input" class="flex items-center w-full max-w-[300px]">
        <input
          form={MINICART_FORM_ID}
          name="set-vendor"
          class="p-2 w-full font-source-sans text-sm tracking-[0.07em] text-black placeholder:font-source-sans placeholder:text-sm placeholder:tracking-[0.07em] placeholder:text-black opacity-40 focus:outline-none bg-[#f9f9f9] border-b border-[#d8caa5] h-10"
          type="text"
          value={vendor ?? ""}
          placeholder="Código"
          hx-on="input: this.nextElementSibling.classList.toggle('opacity-100', this.value.length > 0); 
                      this.nextElementSibling.classList.toggle('opacity-30', this.value.length === 0);"
          id="set-vendor-code"
        />
        <button
          form={MINICART_FORM_ID}
          class="w-10 h-10 bg-[#bea669] flex justify-center items-center capitalize tracking-[0.07em] font-semibold text-sm text-white opacity-30"
          name="action"
          value="set-vendor"
          hx-trigger="click"
          hx-swap="innerHTML"
          hx-target="#vendor-input"
          hx-on:click={useScript(handleVendor)}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
export default VendorCode;
