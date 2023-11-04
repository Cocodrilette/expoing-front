import mongoose from "mongoose";
import { UserModelInterface } from "./schemas/user.schema";

export const Schema = mongoose.Schema;
export const ObjectId = Schema.ObjectId;
export const model = mongoose.model.bind(mongoose);

export const connectToDb = async () => {
  let db;

  const connectionUrl = process.env.NEXT_PUBLIC_MONGODB_URI ?? "";

  if (!db) {
    db = await mongoose.connect(connectionUrl);
    return db;
  } else {
    return db;
  }
};

export const UserSchema = new Schema<UserModelInterface>({
  address: String,
  name: String,
  indentification: String,
  email: String,
  password: String,
});

export const UserModel =
  mongoose.models.User || model<UserModelInterface>("User", UserSchema);
