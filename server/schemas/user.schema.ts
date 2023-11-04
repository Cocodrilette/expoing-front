import { Schema, UserModel, model } from "../mongoose";

export interface IUser {
  address: string;
  name: string;
  email: string;
  indentification: string;
  password: string;
}

export interface UserModelInterface extends IUser {}

export class User {
  private static instance: User;

  static getInstance() {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  async createUser(user: IUser) {
    const newUser = new UserModel(user);
    try {
      const savedUser = await newUser.save();
      console.log("User saved successfully!");
      return savedUser;
    } catch (err) {
      console.error(err);
    }
  }

  async getAllUsers() {
    try {
      const users = await UserModel.find({});
      console.log(users);
      return users;
    } catch (err) {
      console.error(err);
    }
  }

  async updateUser(userId: string, user: Partial<IUser>) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
        new: true,
      });
      console.log("User updated successfully!");
      return updatedUser;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteUser(userId: string) {
    try {
      const deletedUser = await UserModel.findByIdAndRemove(userId);
      console.log("User deleted successfully!");
      return deletedUser;
    } catch (err) {
      console.error(err);
    }
  }

  async findByEmailAndAddress(email: string, address: string) {
    try {
      const user = await UserModel.findOne({ email, address });
      console.log(user);
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async findOneByAddress(address: string) {
    try {
      const user = await UserModel.findOne({ address });
      console.log(user);
      return user;
    } catch (err) {
      console.error(err);
    }
  }
}
