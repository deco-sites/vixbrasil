import { type AppContext } from "apps/vtex/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  addToCart: async ({ addToCart }, req, ctx) => {
    const response = await ctx.invoke(
      "vtex/actions/cart/addItems.ts",
      // @ts-expect-error I don't know how to fix this
      addToCart,
    );

    return cartFrom(response, req.url);
  },
  setQuantity: async ({ items }, req, ctx) => {
    const response = await ctx.invoke(
      "vtex/actions/cart/updateItems.ts",
      {
        allowedOutdatedData: ["paymentData"],
        orderItems: items.map((quantity, index) => ({ quantity, index })),
      },
    );

    return cartFrom(response, req.url);
  },
  setCoupon: async ({ coupon }, req, ctx) => {
    const response = await ctx.invoke(
      "vtex/actions/cart/updateCoupons.ts",
      { text: coupon ?? undefined },
    );
    return cartFrom(response, req.url);
  },
  removeCoupon: async ({ coupon }, req, ctx) => {
    console.log("Cupom:", coupon);
    const response = await ctx.invoke(
      "vtex/actions/cart/updateCoupons.ts",
      { text: undefined },
    );
    return cartFrom(response, req.url);
  },
  setVendorCode: async ({ vendor }, req, ctx) => {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("=")),
    );
    const coupon = cookies.couponCode || "";
    const response = await ctx.invoke(
      "vtex/actions/cart/updateAttachment.ts",
      {
        attachment: "marketingData",
        body: { utmiPart: vendor, coupon },
      },
    );

    return cartFrom(response, req.url);
  },
};

export default actions;
