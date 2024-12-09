import { useContext, useReducer } from "preact/hooks";
import { createContext } from "preact";
import { Action, KitDataActions, KitProviderType, KitType } from "./types.ts";

const INITIAL_STATE: KitType = {
  kitItems: [],
};

const KitContext = createContext<KitDataActions>({} as KitDataActions);

const reducer = function (state: KitType, action: Action) {
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

    default:
      return state;
  }
};

const KitProvider = ({ children }: KitProviderType) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <KitContext.Provider value={{ state, dispatch }}>
      {children}
    </KitContext.Provider>
  );
};

const useKitContext = () => {
  const context = useContext(KitContext);
  return context;
};

export { KitProvider, useKitContext };
