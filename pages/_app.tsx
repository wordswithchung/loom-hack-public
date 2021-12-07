import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import UserContext from "../context/UserContext";
import { Team, User } from "@prisma/client";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);

  return (
    <>
      <Head>
        <title>TabTop</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
        />
      </Head>
      <UserContext.Provider
        value={{
          user,
          team,
          setTeamObj: setTeam,
          setUserObj: setUser,
        }}
      >
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
