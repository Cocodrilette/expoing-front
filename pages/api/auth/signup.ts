// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcrypt';
// import { User } from '../../../models/User';
// import { connectToDatabase } from '../../../utils/database';
// import { validateEmail } from '../../../utils/validateEmail';

// export default async function signup(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(422).json({ message: 'Missing required fields' });
//   }

//   if (!validateEmail(email)) {
//     return res.status(422).json({ message: 'Invalid email address' });
//   }

//   const { db } = await connectToDatabase();

//   const existingUser = await db.collection('users').findOne({ email });

//   if (existingUser) {
//     return res.status(422).json({ message: 'Email address already in use' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = new User({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   await user.save();

//   return res.status(201).json({ message: 'User created successfully' });
// }
