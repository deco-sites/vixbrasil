import LoginButton from "../../islands/LoginButton/index.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import { useScript } from "site/sdk/useScript.ts";
const onLoad = (containerID: string) => {
  window.STOREFRONT.USER.subscribe((sdk) => {
    const container = document.getElementById(containerID) as HTMLDivElement;
    const nodes = container?.querySelectorAll<HTMLAnchorElement>(
      "#vix-brasil__login-icon",
    );
    const login = nodes?.item(0);
    const account = nodes?.item(1);
    const user = sdk.getUser();
    if (user?.email) {
      login?.classList.add("hidden");
      account?.classList.remove("hidden");
    } else {
      login?.classList.remove("hidden");
      account?.classList.add("hidden");
    }
  });
};
function SignIn({ variant }: {
  variant: "mobile" | "desktop";
}) {
  const id = useId();

  return (
    <div id={id}>
      <a
        id="vix-brasil__login-icon"
        class=" group-hover/header:text-black duration-200"
        href="/login"
        aria-label="Login"
      >
        <Icon id="account_icon" width={18} height={20} />
      </a>
      <div
        id="vix-brasil__login-icon"
        class={clx(
          "hidden",
          "relative",
        )}
        aria-label="Account"
      >
        <LoginButton
          variant={variant}
        />
      </div>
      <script
        type="module"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}
export default SignIn;
