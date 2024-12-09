import {
  HEADER_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";

/** @titleBy name */
export type NavItemProps = {
  name?: string;
  url?: string;
  children?: NavItemChildren[];
};
/** @titleBy name */
interface NavItemChildren {
  bold?: boolean;
  name?: string;
  url?: string;
  children?: INavItemChildren[];
}
/** @titleBy name */
interface INavItemChildren {
  bold?: boolean;
  name?: string;
  url?: string;
  children?: IINavItemChildren[];
}
/** @titleBy name */
interface IINavItemChildren {
  bold?: boolean;
  name?: string;
  url?: string;
}

function NavItem({ item }: { item: NavItemProps }) {
  const { url, name, children } = item;

  return (
    <li
      class="group/navitem flex items-center px-5 py-2.5"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={url}
        class="font-source-sans text-sm font-light text-inherit uppercase group-hover/navitem:font-normal group-hover/header:text-black"
      >
        {name}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover/navitem:flex bg-base-100 z-40 items-start justify-center gap-6 border-t-2 border-b-2 border-base-200 w-screen text-black"
            style={{
              top: "100%",
              left: "0px",
              marginTop: HEADER_HEIGHT_DESKTOP,
            }}
          >
            <ul class="flex items-start justify-center gap-6 container">
              {children.map((node) => (
                <li class="p-6 pl-0">
                  <a
                    class={`${
                      node.bold
                        ? "font-semibold hover:font-bold"
                        : "font-light hover:font-normal"
                    } uppercase font-source-sans text-sm duration-200`}
                    href={node.url}
                  >
                    <span>{node.name}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-0">
                    {node.children?.map((leaf) => (
                      <li class="group/navleaf">
                        <a
                          class={`${
                            leaf.bold
                              ? "font-semibold hover:font-bold"
                              : "font-light hover:font-normal"
                          } font-source-sans duration-200`}
                          href={leaf.url}
                        >
                          <span
                            class={`${
                              leaf.name?.toLocaleLowerCase() === "ver todos" &&
                              "font-semibold"
                            } text-sm uppercase`}
                          >
                            {leaf.name}{" "}
                            {leaf.children && (
                              <span class="before:content-['+'] text-[25px] relative top-1 left-1 group-hover/navleaf:before:content-['-'] group-hover/navleaf:top-[2px] group-hover/navleaf:text-[30px]">
                              </span>
                            )}
                          </span>
                        </a>

                        <ul class="flex flex-col gap-1 mt-0 pl-2 overflow-hidden h-auto max-h-[0px]  group-hover/navleaf:max-h-[200px] duration-200">
                          {leaf.children?.map((i) => (
                            <li>
                              <a
                                class={`${
                                  i.bold
                                    ? "font-semibold hover:font-bold"
                                    : "font-light hover:font-normal"
                                } font-source-sans text-bronze duration-200`}
                                href={leaf.url}
                              >
                                <span class="text-sm uppercase">{i.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
