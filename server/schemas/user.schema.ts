import { Schema, model } from "../mongoose";

interface IUser {
  address: string;
  name: string;
  email: string;
  indentification: string;
  password: string;
}

interface UserModelInterface extends IUser {}

const UserSchema = new Schema<UserModelInterface>({
  address: String,
  name: String,
  indentification: String,
  email: String,
  password: String,
});

export class User {
  private UserModel = model<UserModelInterface>("User", UserSchema);

  async createUser(user: IUser) {
    const newUser = new this.UserModel(user);
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
      const users = await this.UserModel.find({});
      console.log(users);
      return users;
    } catch (err) {
      console.error(err);
    }
  }

  async updateUser(userId: string, user: Partial<IUser>) {
    try {
      const updatedUser = await this.UserModel.findByIdAndUpdate(userId, user, {
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
      const deletedUser = await this.UserModel.findByIdAndRemove(userId);
      console.log("User deleted successfully!");
      return deletedUser;
    } catch (err) {
      console.error(err);
    }
  }

  async findOneByAddress(address: string) {
    try {
      const user = await this.UserModel.findOne({ address });
      console.log(user);
      return user;
    } catch (err) {
      console.error(err);
    }
  }
}
