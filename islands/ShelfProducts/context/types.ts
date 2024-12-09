import type { Dispatch, ReactNode } from "preact/compat";

export interface ShelfProductsProviderType {
  children: ReactNode;
}
export interface ShelfProductsDataActions {
  state: ShelfProductsType;
  dispatch: Dispatch<Action>;
}

export interface ShelfProductsType {
  openModal: boolean;
  kitItems: AddShelfProductsToCart[];
}

type AddShelfProductsToCart = {
  id: string;
  refId: string;
  seller: string;
  quantity: number;
  image: string;
  brand?: string;
  group_id?: string;
  name?: string;
  url?: string;
  variant: string;
  listPrice: number;
  price?: number;
};

export type Action = {
  type: "SET_DATA_1";
  payload: AddShelfProductsToCart;
} | {
  type: "SET_DATA_2";
  payload: AddShelfProductsToCart;
} | {
  type: "SET_OPEN_MODAL";
  payload: boolean;
};
