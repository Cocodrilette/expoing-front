import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../server/mongoose";
import { User } from "../../../server/schemas";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log(req.body);

  const { name, email, password, indentification, address } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ message: "Missing required fields" });
  }

  await connectToDb();

  const user = new User().createUser({
    name,
    email,
    password,
    address,
    indentification,
  });

  return res.status(201).json({ message: "User created successfully", user });
}
