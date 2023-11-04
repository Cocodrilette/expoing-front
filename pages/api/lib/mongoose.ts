import mongoose from "mongoose";

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
