"use client";

import { ToastContainer } from "react-toastify";

/**
 * @description to be used for client-side global components
 */
const ComponentsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default ComponentsProvider;
