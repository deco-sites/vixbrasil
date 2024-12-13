import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
// import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Section from "../../components/ui/Section.tsx";
import Newsletter from "../Newsletter/Newsletter.tsx";
import { useDevice } from "@deco/deco/hooks";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  links?: Link[];
  social?: Social[];
  paymentMethods?: Social[];
  logo?: ImageWidget;
}

function Desktop({
  links = [],
  social = [],
  paymentMethods = [],
  logo,
}: Props) {
  const newsProps = {
    empty: {
      title:
        "<b>10%</b> OFF na primeira compra em coleção Assine nossa newsletter",
      description: "",
    },

    label: "INSCREVA-SE",
    status: undefined,
  };
  return (
    <>
      <div class="flex flex-col justify-between items-start sm:items-center">
        <div class="flex items-center justify-center w-full">
          <hr class="w-full text-[#030304]" />
          <p class="text-[#030304] font-bold mx-6 text-2xl w-max whitespace-nowrap">
            Perfis oficiais
          </p>
          <hr class="w-full text-[#030304]" />
        </div>

        <ul class="flex gap-4 justify-center mt-4 mb-8">
          {social.map(({ image, href, alt }) => (
            <li class="hover:opacity-80 duration-200">
              <a href={href}>
                <Image
                  src={image}
                  alt={alt}
                  loading="lazy"
                  width={32}
                  height={32}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div class="flex flex-col gap-5 sm:gap-10 py-13 px-10">
        <ul class="flex items-start justify-between gap-6">
          {links.map(({ title, href, children }) => (
            <li class="flex flex-col gap-4">
              <a
                class="font-source-sans text-[#bea669] text-base font-normal uppercase tracking-[0.07em]"
                href={href}
              >
                {title}
              </a>
              <ul class="flex flex-col gap-4">
                {children.map(({ title, href }) => (
                  <li class="h-auto flex">
                    <a
                      class="font-source-sans text-[#030304] hover:text-[#bea669] text-xs font-normal tracking-[0.07em] duration-200"
                      href={href}
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li>
            <Newsletter {...newsProps} />
          </li>
        </ul>
      </div>
      <div class="p-10">
        <hr class="w-full text-[#e8e8e8] mb-10" />

        <div class="grid grid-flow-row sm:grid-flow-col gap-8">
          <ul class="flex flex-wrap items-center gap-2 justify-end xl:justify-between">
            <li class="mr-auto lg:mr-5">
              <p class="font-source-sans text-base tracking-[1.12px] whitespace-nowrap text-black">
                Formas de Pagamento
              </p>
            </li>
            {paymentMethods.map(({ image, alt }) => (
              <li class="border border-base-100 rounded flex justify-center items-center flex-wrap sm:flex-nowrap">
                <Image
                  src={image}
                  alt={alt}
                  width={174}
                  height={20}
                  loading="lazy"
                  class="grayscale !object-contain"
                />
              </li>
            ))}
          </ul>
          <ul class="flex gap-2">
            <li class="border border-base-100 rounded flex justify-center items-center">
              <Image
                src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.127/img/footer/google-store-link___a575e3d1f808ff3484f40bb468bfc7d7.png"
                alt="App no Google Play"
                width={90}
                height={27}
                loading="lazy"
                class="grayscale !object-contain"
              />
            </li>
            <li class="border border-base-100 rounded flex justify-center items-center">
              <Image
                src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.127/img/footer/app-store-link___fe7fcd1d3051cb7614f2bea5c64bdbb3.png"
                alt="App no App Store"
                width={90}
                height={27}
                loading="lazy"
                class="grayscale !object-contain"
              />
            </li>
          </ul>

          <div class="grid grid-flow-row sm:grid-flow-col gap-8">
            <ul class="flex gap-2 items-center">
              <li class="mr-5">
                <p class="font-source-sans text-base tracking-[1.12px] whitespace-nowrap text-black">
                  Loja segura
                </p>
              </li>
              <li class="h-auto sm:h-5 border border-base-100 rounded flex justify-center items-center">
                <Image
                  src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.148/img/footer/safe-browsing___f02bb1e55d892823b507b83dc480e65a.png"
                  alt="Safe Browsing Google"
                  width={60}
                  height={20}
                  loading="lazy"
                  class="grayscale !object-contain w-auto h-5"
                />
              </li>
              <li class="h-auto sm:h-5 border border-base-100 rounded flex justify-center items-center">
                <Image
                  src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.148/img/footer/pci___a68eac43f57b704332213e837d4ff298.png"
                  alt="PCI"
                  width={60}
                  height={20}
                  loading="lazy"
                  class="grayscale !object-contain w-auto h-5"
                />
              </li>
              <li class="h-auto sm:h-7 border border-base-100 rounded flex justify-center items-center">
                <Image
                  src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.148/img/footer/lets-encrypt___cd1e93ea5b7acece934d5dc2308653b0.png"
                  alt="Let's Encrypt"
                  width={60}
                  height={30}
                  loading="lazy"
                  class="grayscale !object-contain w-auto h-7"
                />
              </li>
              <li class="h-auto sm:h-5 border border-base-100 rounded flex justify-center items-center">
                <Image
                  src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.148/img/footer/vtex-certified___420675ab19c0357575babc7204a479ea.png"
                  alt="VTEX PCI"
                  width={60}
                  height={20}
                  loading="lazy"
                  class="grayscale !object-contain w-auto h-5"
                />
              </li>
            </ul>

            <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4">
              <span class="font-source-sans text-base tracking-[1.12px] whitespace-nowrap text-black">
                created by
              </span>
              <div>
                <img loading="lazy" src={logo} width={"auto"} height={"auto"} />
              </div>
            </div>
            {
              /*
          <div class="flex flex-nowrap items-center justify-center gap-4">
            <span class="text-sm font-normal text-base-400">Powered by</span>
            <PoweredByDeco />
          </div> */
            }
          </div>
        </div>
      </div>
    </>
  );
}
function Mobile({
  links = [],
  social = [],
  paymentMethods = [],
  logo,
}: Props) {
  const newsProps = {
    empty: {
      title:
        "<b>10%</b> OFF na primeira compra em coleção Assine nossa newsletter",
      description: "",
    },

    label: "INSCREVA-SE",
    status: undefined,
  };
  return (
    <>
      <Newsletter {...newsProps} />
      <div class="flex flex-col justify-between items-start sm:items-center">
        <div class="flex items-center justify-center w-full">
          <hr class="w-full text-[#030304]" />
          <p class="text-[#030304] font-bold mx-6 text-2xl w-max whitespace-nowrap">
            Perfis oficiais
          </p>
          <hr class="w-full text-[#030304]" />
        </div>

        <ul class="flex gap-4 justify-center mt-4 mb-8 mx-auto">
          {social.map(({ image, href, alt }) => (
            <li class="hover:opacity-80 duration-200">
              <a href={href}>
                <Image
                  src={image}
                  alt={alt}
                  loading="lazy"
                  width={24}
                  height={24}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div class="flex flex-col gap-5 sm:gap-10 py-13">
        <ul class="flex flex-col items-start justify-between last:border-none">
          {links.map(({ title, href, children }) => (
            <li class="flex flex-col gap-4 w-full border-b border-[#e8e8e8]">
              <details class="dropdown group/footer-mobile px-5 py-3 ">
                <summary
                  class="list-none flex justify-between items-center h-5 font-source-sans text-[#030304] text-sm font-normal uppercase tracking-[0.07em] after:content-['+'] after:p-3 after:font-semibold after:text-base group-open/footer-mobile:after:content-['-'] duration-200"
                  href={href}
                >
                  {title}
                </summary>

                <ul class="dropdown-content group-open/footer-mobile:max-h-[300px] max-h-[0px] flex flex-col gap-4 z-10 !relative duration-700 overflow-hidden py-4">
                  {children.map(({ title, href }) => (
                    <li class="h-auto flex">
                      <a
                        class="font-source-sans text-[#030304] hover:text-[#bea669] text-xs font-normal tracking-[0.07em] duration-200"
                        href={href}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
      <div class="p-6">
        <div class="flex flex-col gap-8">
          <ul class="flex gap-2">
            <li class="border border-base-100 rounded flex justify-start items-center">
              <Image
                src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.127/img/footer/google-store-link___a575e3d1f808ff3484f40bb468bfc7d7.png"
                alt="App no Google Play"
                width={90}
                height={27}
                loading="lazy"
                class="grayscale !object-contain"
              />
            </li>
            <li class="border border-base-100 rounded flex justify-between items-center">
              <Image
                src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.127/img/footer/app-store-link___fe7fcd1d3051cb7614f2bea5c64bdbb3.png"
                alt="App no App Store"
                width={90}
                height={27}
                loading="lazy"
                class="grayscale !object-contain"
              />
            </li>
          </ul>
          <ul>
            <li>
              <p class="font-source-sans text-base tracking-[1.12px] whitespace-nowrap text-black">
                Formas de Pagamento
              </p>
            </li>
            <li class="flex justify-start items-center gap-3 pt-2 flex-wrap">
              {paymentMethods.map(({ image, alt }) => (
                <Image
                  src={image}
                  alt={alt}
                  width={174}
                  height={20}
                  loading="lazy"
                  class="grayscale !object-contain"
                />
              ))}
            </li>
          </ul>

          <div class="grid grid-flow-row sm:grid-flow-col gap-8">
            <ul class="gap-2 items-center">
              <li class="mr-5">
                <p class="font-source-sans text-base tracking-[1.12px] whitespace-nowrap text-black">
                  Loja segura
                </p>
              </li>
              <li class="h-auto sm:h-7 pt-2 border border-base-100 rounded flex justify-start gap-5 flex-wrap">
                <Image
                  src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.148/img/footer/safe-browsing___f02bb1e55d892823b507b83dc480e65a.png"
                  alt="Safe Browsing Google"
                  width={60}
                  height={20}
                  loading="lazy"
                  class="grayscale !object-contain w-auto h-7"
                />

                <Image
                  src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.148/img/footer/pci___a68eac43f57b704332213e837d4ff298.png"
                  alt="PCI"
                  width={60}
                  height={20}
                  loading="lazy"
                  class="grayscale !object-contain w-auto h-7"
                />

                <Image
                  src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.148/img/footer/lets-encrypt___cd1e93ea5b7acece934d5dc2308653b0.png"
                  alt="Let's Encrypt"
                  width={60}
                  height={30}
                  loading="lazy"
                  class="grayscale !object-contain w-auto h-7"
                />

                <Image
                  src="https://vixbrasil.vtexassets.com/assets/vtex/assets-builder/vixbrasil.store/3.0.148/img/footer/vtex-certified___420675ab19c0357575babc7204a479ea.png"
                  alt="VTEX PCI"
                  width={60}
                  height={20}
                  loading="lazy"
                  class="grayscale !object-contain w-auto h-7"
                />
              </li>
            </ul>

            <div class="mt-4">
              <span class="font-source-sans text-base tracking-[1.12px] whitespace-nowrap text-black">
                created by
              </span>
              <div class="pt-2">
                <img loading="lazy" src={logo} width={"auto"} height={"auto"} />
              </div>
            </div>
            {
              /*
          <div class="flex flex-nowrap items-center justify-center gap-4">
            <span class="text-sm font-normal text-base-400">Powered by</span>
            <PoweredByDeco />
          </div> */
            }
          </div>
        </div>
      </div>
    </>
  );
}

function Footer(props: Props) {
  const device = useDevice();

  return (
    <footer class="mt-5 sm:mt-10">
      {device === "desktop" ? <Desktop {...props} /> : <Mobile {...props} />}
    </footer>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;
