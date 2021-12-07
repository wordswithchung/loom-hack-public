import { useContext } from "react";
import Link from "next/link";
import UserContext from "../../context/UserContext";
import { Collection } from "../icons/collection";
import { Person } from "../icons/person";
import styles from "./Header.module.css";

export const Header = () => {
  const { user, team, setTeamObj, setUserObj } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>TABTOP</div>
      <div className={styles.right}>
        <nav className={styles.nav}>
          <Link href={`/team/${team?.id}`}>Watch Videos</Link>
          {"|"}
          <Link href={`/team/${team?.id}/record`}>Record Your Own</Link>
          {"|"}
          <Link href={"/"}>
            <a
              onClick={() => {
                setTeamObj(null);
                setUserObj(null);
              }}
            >
              Log Out
            </a>
          </Link>
        </nav>

        <div>
          {!!user?.name && (
            <p className={styles.item}>
              <Person />
              <span>{user.name}</span>
            </p>
          )}
          {!!team?.name && (
            <p className={styles.item}>
              <Collection />
              <span>{team.name}</span>
            </p>
          )}
        </div>
      </div>
    </header>
  );
};
