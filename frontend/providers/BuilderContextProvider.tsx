'use client';
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { AppContextProvider } from "../context/AppContext";
import ComponentsProvider from "./ComponentsProvider";

const BuilderContextProvider = (providers: any): any => {
  if (providers.length === 1) {
    return providers[0];
  }
  const A = providers.shift();
  const B = providers.shift();
  return BuilderContextProvider([
    ({ children }: { children: React.ReactNode }) => (
      <A>
        <B>
          {children}
        </B>
      </A>
    ),
    ...providers,
  ]);
};

export const BuilderTreeProvider = BuilderContextProvider([
  SessionProvider,
  ReactQueryProvider,
  AppContextProvider,
  ComponentsProvider,
]);
