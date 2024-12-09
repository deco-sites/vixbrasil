export default function ProductImageZoom() {
  const myDots = document.querySelector(".dots-container");
  const myDotsPrev = document.querySelector(".dots-container--prev");
  const myDotsNext = document.querySelector(".dots-container--next");

  const zoom = {
    init() {
      const wrappers = document.querySelectorAll(".imageZoom--wrapper");
      const images = document.querySelectorAll(".imageZoom--image");

      wrappers.forEach((wrapper, index) => {
        const img = images[index];

        const handleMouseMove = (e) => {
          const { left, top } = wrapper.getBoundingClientRect();
          const x = e.pageX - left;
          const y = e.pageY - top;
          const styles = `transform: scale(2); transform-origin: ${x}px ${y}px`;
          img.style = styles;
        };
        const handleMouseLeave = () => {
          img.style = "";
        };

        wrapper.addEventListener("mousemove", handleMouseMove);
        wrapper.addEventListener("mouseleave", handleMouseLeave);
      });
    },
  };

  const scrollDots = {
    init() {
      const scrollPrev = () => {
        myDots.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      const scrollNext = () => {
        const { scrollHeight } = myDots;

        myDots.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      };

      myDotsPrev.addEventListener("click", scrollPrev);
      myDotsNext.addEventListener("click", scrollNext);
    },
  };

  zoom.init();
  scrollDots.init();
}
