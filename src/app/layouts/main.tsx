import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      {children}
      <div style={{ marginTop: "128px" }} />
    </>
  );
};