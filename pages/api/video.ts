import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const teamId = req.query.teamId;

  if (req.method === "GET" && !!teamId) {
    handleGET(teamId as string, res);
  } else if (req.method === "POST") {
    handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function handleGET(teamName: string, res: NextApiResponse) {
  const videos = await prisma.video.findMany({
    where: { teamId: teamName },
  });
  res.json(videos);
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { shareUrl, teamId, userId } = req.body;
  console.log("req.body", req.body);
  const result = await prisma.video.create({
    data: {
      teamId,
      userId,
      shareUrl,
    },
  });
  res.json(result);
}
