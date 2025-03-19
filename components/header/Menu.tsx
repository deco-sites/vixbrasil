import Drawer from "../ui/Drawer.tsx";
import Icon from "../ui/Icon.tsx";

interface MobileMenu {
  /**  @title Mobile items */
  mobileItems?: MobileMenuItem[];
}

export interface MobileMenuItem {
  /**  @title Mobile items */
  item: MobileMenuItems[];
}
/** @titleBy title */
interface MobileMenuItems {
  title: string;
  url: string;
  target: "_blank" | "_self";
  bold?: boolean;
  children?: MobileSubMenuItem[];
}
/** @titleBy title */
interface MobileSubMenuItem {
  title: string;
  url: string;
  target: "_blank" | "_self";
  children?: MobileSubMenuItem[];
}

function SubMenuItem(subItem: MobileMenuItems) {
  return (
    <>
      <Drawer
        id={`${subItem.title}--drawer`}
        aside={
          <Drawer.Aside
            class="bg-white h-full w-full"
            titleClass="font-source-sans text-[#030303] text-sm font-medium uppercase"
            headerClass="bg-[#f7f4ed] p-1.5"
            title="Voltar"
            drawer={`${subItem.title}--drawer`}
          >
            <div class="py-10 mx-4">
              <p class="font-source-sans text-left text-sm tracking-[0.98px] uppercase font-medium">
                {subItem.title}
              </p>
              <ul>
                {subItem.children?.map((node) => (
                  node?.children?.length && node?.children?.length > 0
                    ? (
                      <li class="p-2">
                        <details class="dropdown group/submenu-mobile">
                          <summary class="list-none flex items-center gap-2 font-source-sans text-left text-sm tracking-[0.98px] uppercase font-light">
                            {node.title}

                            <span>
                              <Icon
                                id="sm-arrow"
                                size={10}
                                class="group-open/submenu-mobile:rotate-[-90deg] rotate-90 duration-200"
                              />
                            </span>
                          </summary>
                          <ul class="menu dropdown-content z-10 !relative">
                            {node?.children?.map((item) => (
                              <li class="p-2">
                                <a
                                  href={item.url}
                                  class="font-source-sans text-left text-sm tracking-[0.98px] uppercase font-light p-0 text-[#a18c60]"
                                >
                                  {item.title}
                                </a>
                              </li>
                            ))}
                            <li class="p-2">
                              <a
                                href={node.url}
                                class="font-source-sans text-left text-sm tracking-[0.98px] uppercase font-light p-0 text-[#a18c60]"
                              >
                                Ver tudo
                              </a>
                            </li>
                          </ul>
                        </details>
                      </li>
                    )
                    : (
                      <li class="p-2">
                        <a
                          href={node.url}
                          class="font-source-sans text-left text-sm tracking-[0.98px] uppercase font-light"
                        >
                          {node.title}
                        </a>
                      </li>
                    )
                ))}
                <li class="p-2">
                  <a
                    href={subItem.url}
                    class="font-source-sans text-left text-sm tracking-[0.98px] uppercase font-light"
                  >
                    ver tudo
                  </a>
                </li>
              </ul>
            </div>
          </Drawer.Aside>
        }
      />
      <div>
        <div>
          <label
            for={`${subItem.title}--drawer`}
            class={`flex justify-between items-center mb-2 font-source-sans text-left text-sm font-medium tracking-[0.98px] uppercase ${
              subItem.bold
                ? "subMenu_bold font-medium text-[#bea669]"
                : "font-medium"
            }`}
            aria-label="open submenu"
          >
            {subItem.title}
            <Icon id="sm-arrow" width={7} height={11} />
          </label>
        </div>
      </div>
    </>
  );
}
function MenuItem({ item }: MobileMenuItem) {
  return (
    <div>
      <div>
        <ul>
          {item.map((node) => {
            const boldItems = item.filter((n) => n.bold);
            const isLastBold = boldItems[boldItems.length - 1] === node;
            return (
              <li
                class={`${
                  node.bold
                    ? `subMenu_bold block ${isLastBold ? "mb-[26px]" : ""}`
                    : ""
                }`}
              >
                {node.children ? <SubMenuItem {...node} /> : (
                  <a
                    href={node.url}
                    class={`block mb-2 font-source-sans text-left text-sm font-medium tracking-[0.98px] uppercase ${
                      node.bold ? "font-medium text-[#bea669]" : "font-medium"
                    }`}
                  >
                    {node.title}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Menu({ mobileItems }: MobileMenu) {
  return (
    <div
      class="flex flex-col h-screen overflow-y-auto"
      style={{ minWidth: "90vw" }}
    >
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
        {mobileItems?.map(({ item }) => (
          <li class="py-10 border-b border-[#cbb887]">
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
