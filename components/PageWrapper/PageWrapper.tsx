import Router from "next/router";
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { Header } from "../header/Header";

export const PageWrapper = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.id) {
      Router.push("/");
    }
  });

  return (
    <main>
      <Header />
      {children}
    </main>
  );
};
