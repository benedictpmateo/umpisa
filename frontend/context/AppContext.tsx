"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import update from "immutability-helper";
import { PayloadAction } from "../utils/payload";
import { STORAGE_KEY } from "@/utils/constant";

export type AppContextAction = "app.update" | "app.reset";

export interface AppContextState {
  token?: string;
}

export interface AppContextType {
  app: AppContextState;
  dispatchApp: (
    payload: Partial<PayloadAction<Partial<AppContextState>, AppContextAction>>
  ) => void;
}

const initialState: AppContextState = {
  token: ''
};

const reducer = (
  state: AppContextState,
  payload: Partial<PayloadAction<Partial<AppContextState>, AppContextAction>>
) => {
  let newState = state;
  switch (payload.type) {
    case "app.update":
      newState = update(state, {
        $merge: payload?.payload || {},
      });
      break;
    case "app.reset":
      newState = update(state, {
        $merge: initialState,
      });
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

const AppContext = createContext<AppContextType>({
  app: initialState,
  dispatchApp: (
    payload: Partial<PayloadAction<Partial<AppContextState>, AppContextAction>>
  ) => null,
});

export const useAppContext = () => {
  const context = useContext<AppContextType>(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [app, dispatchApp] = useReducer(
    reducer,
    initialState,
    (state) => state
  );

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);
    dispatchApp({
      type: "app.update",
      payload: {
        token,
      },
    });
  }, []);

  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      {children}
    </AppContext.Provider>
  );
};
