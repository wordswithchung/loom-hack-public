import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import type { NextPage } from "next";
import Router from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { setUserObj, setTeamObj } = useContext(UserContext);

  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const email = inputRef?.current?.value;
    setError("");

    if (!email) {
      setError("Please enter an email address");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/user?email=${email}`);
      const user = await res.json();
      const resTeam = await fetch(
        `http://localhost:3000/api/team?id=${user.teamId}`
      );
      const team = await resTeam.json();
      setUserObj(user);
      setTeamObj(team);
      Router.push(`/team/${user.teamId}`);
    } catch (e) {
      setError("User not found; contact your team admin for assistance");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.logo}>TABTOP</div>
      <form className={styles.form}>
        <label htmlFor="email">Please enter your email address</label>
        <input
          type="text"
          name="email"
          ref={inputRef}
          placeholder="Email address"
        />
        {!!error && <div className={styles.error}>{error}</div>}
        <button onClick={handleClick}>Let{`'`}s go!</button>
      </form>
    </main>
  );
};

export default Home;
