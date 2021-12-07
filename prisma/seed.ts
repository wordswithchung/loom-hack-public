import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// TODO THIS SEED FILE DOESN'T WORK AS EXPECTED
const Teams = [
  {
    id: "d99e9ce0-c043-4b74-8db9-723264f8efb0",
    name: "Holmes",
    keyPhrase: "No place like Holmes",
  },
  {
    id: "4454125e-a7ed-4e22-bbf1-4ebf4bb14212",
    name: "Lola Pup",
    keyPhrase: "Dogs rule!",
  },
];

const Users = [
  {
    id: "dbd2fc45-22d0-4b75-bcaf-18cec3fec159",
    teamId: "d99e9ce0-c043-4b74-8db9-723264f8efb0",
    name: "Eleanor Shellstrop",
  },
  {
    id: "031d22f9-240f-462a-a885-0856edbdc149",
    teamId: "d99e9ce0-c043-4b74-8db9-723264f8efb0",
    name: "Chidi Anagonye",
  },
  {
    id: "ae1f0c06-458b-41b5-9d8a-4b43ea49d8c4",
    teamId: "4454125e-a7ed-4e22-bbf1-4ebf4bb14212",
    name: "Tahani Al-jamil",
  },
  {
    id: "40e705ec-1dab-4d97-a2e3-aec444f21dcb",
    teamId: "4454125e-a7ed-4e22-bbf1-4ebf4bb14212",
    name: "Jason Mendoza",
  },
];

const Videos = [
  {
    // jason
    shareUrl: "https://www.loom.com/share/259e74a407244ef3976642366a8bbd36",
    userId: "40e705ec-1dab-4d97-a2e3-aec444f21dcb",
    teamId: "4454125e-a7ed-4e22-bbf1-4ebf4bb14212",
  },
  {
    // chidi
    shareUrl: "https://www.loom.com/share/3544a40836054d81a8da088c7da65636",
    userId: "031d22f9-240f-462a-a885-0856edbdc149",
    teamId: "d99e9ce0-c043-4b74-8db9-723264f8efb0",
  },
];

async function seed() {
  console.log("yes");
  await Promise.all([
    Teams.map((team) => {
      console.log("TEAM", team);
      return db.team.create({ data: team });
    }),
    // Users.map((user) => {
    //   return db.user.create({ data: user });
    // }),
    // Videos.map((video) => {
    //   return db.video.create({ data: video });
    // }),
  ]).catch((e) => console.log("Hey, what's up", e));
}

seed();
