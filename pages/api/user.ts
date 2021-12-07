import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId: string = req.query.id as string;
  const userEmail: string = req.query.email as string;

  if (req.method === "GET" && !!userId) {
    handleGETById(userId, res);
  } else if (req.method === "GET" && !!userEmail) {
    handleGETByEmail(userEmail, res);
  } else if (req.method === "POST") {
    handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function handleGETById(userId: string, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  res.json(user);
}

async function handleGETByEmail(userEmail: string, res: NextApiResponse) {
  const user = await prisma.user.findFirst({ where: { email: userEmail } });
  res.json(user);
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { teamId, name } = req.body;
  const result = await prisma.user.create({
    data: {
      teamId,
      name,
    },
  });
  res.json(result);
}
