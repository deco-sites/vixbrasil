import { MINICART_FORM_ID } from "../../constants.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  coupon?: string;
  discount?: string;
}

function Coupon({ coupon, discount }: Props) {
  if (coupon) {
    return (
      <div class="flex justify-between items-center">
        <span class="font-semibold text-xs tracking-[0.07em]">Cupom</span>

        <div class="flex items-center w-full max-w-[300px]">
          <p class="p-2 w-full font-source-sans text-sm tracking-[0.07em] text-black opacity-80 focus:outline-none bg-[#f9f9f9] border-b border-[#d8caa5] h-10">
            Desconto de {discount}
          </p>

          <label
            form={MINICART_FORM_ID}
            for="remove-coupon-cart"
            hx-trigger="click"
            hx-swap="innerHTML"
            hx-target="this.parentElement"
            class="w-10 h-10 bg-[#bea669] flex justify-center items-center capitalize tracking-[0.07em] font-semibold text-sm text-white cursor-pointer"
            hx-on="click: document.cookie = 'couponCode=' + null + ';path=/;'"
          >
            <Icon id="trash" size={20} />

            <input
              form={MINICART_FORM_ID}
              name="action"
              value="remove-coupon"
              type="checkbox"
              class="hidden"
              id="remove-coupon-cart"
            />
          </label>
        </div>
      </div>
    );
  }
  return (
    <div class="flex justify-between items-center">
      <span class="font-semibold text-xs tracking-[0.07em]">Cupom</span>

      <div id="coupon-input" class="flex items-center w-full max-w-[300px]">
        <input
          form={MINICART_FORM_ID}
          name="coupon"
          class="p-2 w-full font-source-sans text-sm tracking-[0.07em] text-black placeholder:font-source-sans placeholder:text-sm placeholder:tracking-[0.07em] placeholder:text-black opacity-40 focus:outline-none bg-[#f9f9f9] border-b border-[#d8caa5] h-10"
          type="text"
          value={coupon ?? ""}
          placeholder="Cupom"
          hx-on="input: this.nextElementSibling.classList.toggle('opacity-100', this.value.length > 0); 
                      this.nextElementSibling.classList.toggle('opacity-30', this.value.length === 0);"
        />
        <button
          type="button"
          form={MINICART_FORM_ID}
          class="w-10 h-10 bg-[#bea669] flex justify-center items-center capitalize tracking-[0.07em] font-semibold text-sm text-white opacity-30"
          name="action"
          value="set-coupon"
          hx-trigger="click"
          hx-swap="innerHTML"
          hx-target="#coupon-input"
          hx-on="click: document.cookie = 'couponCode=' + this.previousElementSibling.value + ';path=/;'"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
export default Coupon;
