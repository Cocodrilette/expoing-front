import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../server/mongoose";
import { User } from "../../../server/schemas";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { address } = req.body;

  console.log({ req });
  console.log(req.url);

  if (!address) {
    return res.status(422).json({ message: "Missing required fields" });
  }

  await connectToDb();

  const user = User.getInstance().findOneByAddress(address);

  if (!user) {
    return res.status(404).json({ message: "User not found", exists: false });
  }

  return res
    .status(201)
    .json({ message: "User created successfully", user, exists: true });
}
