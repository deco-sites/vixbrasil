import { useContext, useReducer } from "preact/hooks";
import { createContext } from "preact";
import {
  Action,
  ShelfDataActions,
  ShelfProviderType,
  ShelfType,
} from "./types.ts";

const INITIAL_STATE: ShelfType = {
  kitItems: [],
  singleItem: {
    id: "",
    seller: "1",
    value: "Tamanho",
    name: "Tamanho",
  },
};

const ShelfContext = createContext<ShelfDataActions>({} as ShelfDataActions);

const reducer = function (state: ShelfType, action: Action) {
  switch (action.type) {
    case "SET_KIT_1":
      return {
        ...state,
        kitItems: state.kitItems[0]?.id === action.payload.id
          ? state.kitItems.slice(1)
          : [action.payload, ...state.kitItems.slice(1)],
      };

    case "SET_KIT_2":
      return {
        ...state,
        kitItems: state.kitItems[1]?.id === action.payload.id
          ? state.kitItems.slice(0, 1)
          : [state.kitItems[0], action.payload],
      };
    case "SET_ITEM":
      return {
        ...state,
        singleItem: action.payload,
      };

    default:
      return state;
  }
};

const ShelfProvider = ({ children }: ShelfProviderType) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <ShelfContext.Provider value={{ state, dispatch }}>
      {children}
    </ShelfContext.Provider>
  );
};

const useShelfContext = () => {
  const context = useContext(ShelfContext);
  return context;
};

export { ShelfProvider, useShelfContext };
