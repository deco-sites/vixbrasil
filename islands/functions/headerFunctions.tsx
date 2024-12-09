export default function HeaderFunctions() {
  const header = document.getElementById("vix-brasil-header");
  const logo = document.getElementById("vix-brasil-logo");
  const navigation = document.getElementById("vix-brasil-navigation");
  const icons = document.getElementById("vix-brasil__header-icons");
  const login = document.getElementById("vix-brasil__login-icon");
  const searchBar = document.getElementById("vix-brasil__search-bar--open");

  const conditionalHeader = {
    init() {
      if (window.location.pathname === "/") {
        header?.classList.add("bg-blur");
        navigation?.classList.add("text-white");
        login?.classList.add("text-white");
        searchBar?.classList.add("text-white");
        icons?.classList.add("text-white");
        logo?.classList.add("invert");
        logo?.classList.add("brightness-0");
        document.querySelector("header")?.classList.add("!h-[0px]");
      }
      if (window.location.pathname !== "/") {
        header?.classList.add("bg-base-100");
        header?.classList.add(
          window.innerWidth >= 1200 ? "h-[84px]" : "h-auto",
        );
        navigation?.classList.add("text-black");
        icons?.classList.add("text-black");
        login?.classList.add("text-black");
        searchBar?.classList.add("text-black");
      }
    },
  };
  const scrollHeader = {
    init() {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 1;

        header?.classList.toggle("bg-base-100", isScrolled);
        header?.classList.toggle("bg-blur", !isScrolled);

        navigation?.classList.toggle("text-black", isScrolled);
        navigation?.classList.toggle("text-white", !isScrolled);

        icons?.classList.toggle("text-black", isScrolled);
        icons?.classList.toggle("text-white", !isScrolled);

        login?.classList.toggle("text-black", isScrolled);
        login?.classList.toggle("text-white", !isScrolled);

        searchBar?.classList.toggle("text-black", isScrolled);
        searchBar?.classList.toggle("text-white", !isScrolled);

        logo?.classList.toggle("invert", !isScrolled);
        logo?.classList.toggle("brightness-0", !isScrolled);
      };

      addEventListener("scroll", handleScroll);
    },
  };
  const showSearchBar = {
    init: function () {
      const searchBar = document.getElementById("vix-brasil__search-bar");
      const searchBlur = document.getElementById("vix-brasil__search-blur");
      const closeSearchBar = document.getElementById(
        "vix-brasil__search-bar--open",
      );
      const cleanSearchBar = document.getElementById(
        "vix-brasil__search-bar--close",
      );

      closeSearchBar?.addEventListener("click", () => {
        const isCollapsed = searchBar?.classList.contains("max-w-0");

        if (window.innerWidth > 1024) {
          searchBar?.classList.toggle("lg:max-w-[230px]", isCollapsed);
        }
        if (window.innerWidth < 1024) {
          searchBar?.classList.toggle("pb-3", isCollapsed);
          searchBar?.classList.toggle("px-5", isCollapsed);

          logo?.classList.remove("invert");
          logo?.classList.remove("brightness-0");
          icons?.classList.remove("text-white");
          login?.classList.remove("text-white");
        }
        searchBar?.classList.toggle("visible", isCollapsed);
        searchBar?.classList.toggle("opacity-100", isCollapsed);

        searchBlur?.classList.toggle("block", isCollapsed);
        searchBlur?.classList.toggle("hidden", !isCollapsed);

        searchBar?.classList.toggle("hidden", !isCollapsed);
        searchBar?.classList.toggle("max-w-0", !isCollapsed);
        searchBar?.classList.toggle("opacity-0", !isCollapsed);
        searchBar?.classList.toggle("invisible", !isCollapsed);
      });

      cleanSearchBar?.addEventListener("click", () => {
        const isCollapsed = searchBar?.classList.contains("max-w-0");

        searchBar?.classList.toggle("max-w-[230px]", isCollapsed);
        searchBar?.classList.toggle("visible", isCollapsed);
        searchBar?.classList.toggle("opacity-100", isCollapsed);

        searchBar?.classList.toggle("hidden", !isCollapsed);
        searchBar?.classList.toggle("max-w-0", !isCollapsed);
        searchBar?.classList.toggle("opacity-0", !isCollapsed);
        searchBar?.classList.toggle("invisible", !isCollapsed);

        if (window.innerWidth < 1024) {
          logo?.classList.add("invert");
          logo?.classList.add("brightness-0");
          icons?.classList.add("text-white");
          login?.classList.add("text-white");
        }
      });
    },
  };
  conditionalHeader.init();
  showSearchBar.init();
  if (window.location.pathname === "/") {
    scrollHeader.init();
  }
}
