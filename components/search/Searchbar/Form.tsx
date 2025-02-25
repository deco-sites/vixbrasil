/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */
import { Suggestion } from "apps/commerce/types.ts";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";
import { useScript } from "site/sdk/useScript.ts";
import { asResolved, type Resolved } from "@deco/deco";
// When user clicks on the search button, navigate it to
export const ACTION = "/s";
// Querystring param used when navigating the user
export const NAME = "q";
export interface SearchbarProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /** @description Loader to run when suggesting new elements */
  loader: Resolved<Suggestion | null>;
}
const script = (formId: string, name: string, popupId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });
  // Keyboard event listeners
  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;
    // Open Searchbar on meta+k
    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as HTMLInputElement | null;
      if (input) {
        input.checked = true;
        document.getElementById(formId)?.focus();
      }
    }
  });
};
const Suggestions = import.meta.resolve("./Suggestions.tsx");
export default function Searchbar(
  { placeholder = "O que você está buscando?", loader }: SearchbarProps,
) {
  const slot = useId();

  const scriptSearchBar = useScript(
    script,
    SEARCHBAR_INPUT_FORM_ID,
    NAME,
    SEARCHBAR_POPUP_ID,
  );

  const scriptHook = useComponent<SuggestionProps>(Suggestions, {
    loader: asResolved(loader),
  });
  return (
    <div
      id="vix-brasil__search-bar"
      class="w-full overflow-hidden max-w-0 grid gap-0 duration-200 relative lg:left-[50px] left-0 hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={SEARCHBAR_INPUT_FORM_ID} action={ACTION} class="join">
        <label
          id="vix-brasil__search-bar--close"
          type="button"
          class="bg-transparent border-0 cursor-pointer items-center px-3 lg:flex hidden"
          for={SEARCHBAR_POPUP_ID}
          aria-label="Toggle searchbar"
        >
          <Icon id="close" size={20} />
        </label>
        <input
          id="vix-brasil__search-bar--input"
          autoFocus
          tabIndex={0}
          class="focus-visible:outline-none bg-transparent border-b border-white duration-200 h-10 pr-4 font-source-sans text-base text-white placeholder:font-source-sans placeholder:text-white placeholder:text-sm group-hover/header:border-black group-hover/header:text-black group-hover/header:placeholder:text-black w-full "
          name={NAME}
          placeholder={placeholder}
          autocomplete="off"
          hx-target={`#${slot}`}
          hx-post={loader && scriptHook}
          hx-trigger={`input changed delay:300ms, ${NAME}`}
          hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
          hx-swap="innerHTML"
        />
        <button
          type="submit"
          class="btn join-item btn-square no-animation hidden"
          aria-label="Search"
          for={SEARCHBAR_INPUT_FORM_ID}
          tabIndex={-1}
        >
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
          <Icon id="search" class="inline [.htmx-request_&]:hidden" size={18} />
        </button>
      </form>
      <div
        id="vix-brasil__search-blur"
        class="hidden w-full bg-black opacity-50 fixed left-0 top-[100%] h-dvh"
      />

      {/* Suggestions slot */}
      <div id={slot} />

      {/* Send search events as the user types */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: scriptSearchBar,
        }}
      />
    </div>
  );
}
