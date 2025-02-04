import { MINICART_DRAWER_ID } from "../../constants.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import { useScript } from "site/sdk/useScript.ts";
const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;
    if (!counter) {
      return;
    }
    // Set minicart items count on header
    if (count === 0) {
      counter?.classList.add("hidden");
    } else {
      counter?.classList.remove("hidden");
    }
    counter.innerText = count > 9 ? "9+" : count.toString();
  });
function Bag() {
  const id = useId();
  return (
    <>
      <label class="indicator" for={MINICART_DRAWER_ID} aria-label="open cart">
        <span
          id={id}
          class="hidden indicator-item badge badge-primary badge-sm bg-[#bea669] font-source-sans font-normal text-[0.75rem] border-none rounded-full w-4 h-4 top-[0px] right-[0px]"
        />

        <span>
          <Icon id="shopping_bag" width={20} height={19} />
        </span>
      </label>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}
export default Bag;
