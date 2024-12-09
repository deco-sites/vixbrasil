import { createContext } from "preact";
import { useContext, useReducer } from "preact/hooks";
import {
  Action,
  ShelfProductsDataActions,
  ShelfProductsProviderType,
  ShelfProductsType,
} from "./types.ts";

const INITIAL_STATE: ShelfProductsType = {
  openModal: false,
  kitItems: [],
};

const ShelfProductsContext = createContext<ShelfProductsDataActions>(
  {} as ShelfProductsDataActions,
);

const reducer = function (state: ShelfProductsType, action: Action) {
  switch (action.type) {
    case "SET_DATA_1":
      return {
        ...state,
        kitItems: state.kitItems[0]?.id === action.payload.id
          ? state.kitItems.slice(1)
          : [action.payload, ...state.kitItems.slice(1)],
      };

    case "SET_DATA_2":
      return {
        ...state,
        kitItems: state.kitItems[1]?.id === action.payload.id
          ? state.kitItems.slice(0, 1)
          : [state.kitItems[0], action.payload],
      };
    case "SET_OPEN_MODAL":
      return {
        ...state,
        openModal: action.payload,
      };

    default:
      return state;
  }
};

const ShelfProductsProvider = ({ children }: ShelfProductsProviderType) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ShelfProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ShelfProductsContext.Provider>
  );
};

const useShelfProductsContext = () => {
  const context = useContext(ShelfProductsContext);
  return context;
};

export { ShelfProductsProvider, useShelfProductsContext };
