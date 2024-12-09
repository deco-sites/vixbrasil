export const DepartmentImageFunctions = () => {
  const slickBanner = {
    init() {
      const prev = `<button
      type="button"
      class="shop-now__slider--arrow shop-now__slider--arrow--prev"
    >
      <svg
        width="12"
        height="18"
        viewBox="0 0 12 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="black"></path>
      </svg>
    </button>`;
      const next = `<button
      type="button"
      class="shop-now__slider--arrow shop-now__slider--arrow--next"
    >
      <svg
        width="12"
        height="18"
        viewBox="0 0 12 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="black"></path>
      </svg>
    </button>`;
      $(document).ready(function () {
        $(".department-images__slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          prevArrow: prev,
          nextArrow: next,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
                prevArrow: prev,
                nextArrow: next,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
                prevArrow: prev,
                nextArrow: next,
              },
            },
            {
              breakpoint: 370,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
                prevArrow: prev,
                nextArrow: next,
              },
            },
          ],
        });
      });
    },
  };

  slickBanner.init();
};
