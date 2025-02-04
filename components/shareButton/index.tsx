import Icon from "../ui/Icon.tsx";
import { useScript } from "site/sdk/useScript.ts";
const onClick = () => {
  navigator.share({
    title: "Share",
    text: "whatevs",
    url: window.location.href,
  });
};
export default function ShareButton() {
  return (
    <>
      <div class="share-button__box">
        <button class="share-button__button" hx-on:click={useScript(onClick)}>
          <Icon size={22} id="share" />
        </button>
      </div>
    </>
  );
}
