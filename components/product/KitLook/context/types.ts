import type { Dispatch, ReactNode } from "preact/compat";

export interface KitProviderType {
  children: ReactNode;
}
export interface KitDataActions {
  state: KitType;
  dispatch: Dispatch<Action>;
}

export interface KitType {
  kitItems: AddKitToCart[];
}

type AddKitToCart = {
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
  payload: AddKitToCart;
} | {
  type: "SET_DATA_2";
  payload: AddKitToCart;
};
