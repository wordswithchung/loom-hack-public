import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const teamId: string = req.query.id as string;

  if (req.method === "GET" && !!teamId) {
    handleGET(teamId, res);
  }
}

async function handleGET(teamId: string, res: NextApiResponse) {
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  res.json(team);
}
