import { Team, User } from "@prisma/client";
import { createContext } from "react";

export interface UserContextInterface {
  user: User | null;
  team: Team | null;
  setUserObj: (_user: User | null) => void;
  setTeamObj: (_team: Team | null) => void;
}

const UserContext = createContext<UserContextInterface>({
  user: {
    id: "",
    name: "",
    teamId: "",
    email: "",
  },
  team: {
    id: "",
    name: "",
    keyPhrase: "",
  },
  setUserObj: (_name: User | null): void => {},
  setTeamObj: (_name: Team | null): void => {},
});

export default UserContext;
