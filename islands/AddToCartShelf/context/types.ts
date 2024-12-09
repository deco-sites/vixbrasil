import type { Dispatch, ReactNode } from "preact/compat";

export interface ShelfProviderType {
  children: ReactNode;
}
export interface ShelfDataActions {
  state: ShelfType;
  dispatch: Dispatch<Action>;
}

export interface ShelfType {
  kitItems: AddKitShelfToCart[];
  singleItem?: AddToCart;
}

type AddKitShelfToCart = {
  id: string;
  refId: string;
  seller: string;
  quantity: number;
  image: string;
  value?: string;
  brand?: string;
  group_id?: string;
  name?: string;
  url?: string;
  variant: string;
  listPrice: number;
  price?: number;
};

type AddToCart = {
  id: string;
  seller: string;
  value: string;
  name: string;
};

export type Action = {
  type: "SET_KIT_1";
  payload: AddKitShelfToCart;
} | {
  type: "SET_KIT_2";
  payload: AddKitShelfToCart;
} | {
  type: "SET_ITEM";
  payload: AddToCart;
};
