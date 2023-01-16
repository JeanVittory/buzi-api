import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument } from '../schemas/users.schema';
import { Users } from 'src/auth/types';

@Injectable()
class UsersRepository {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<Users>): Promise<Users> {
    try {
      return await this.userModel.findOne(userFilterQuery);
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      return error;
    }
  }

  async create(user: Omit<Users, '_id'>): Promise<Users> {
    try {
      const newUser = new this.userModel(user);
      const res = await newUser.save();
      return res;
    } catch (error) {
      return error;
    }
  }

  async updateUser(
    userFilterQuery: FilterQuery<Users>,
    user: Partial<Users>,
  ): Promise<Users> {
    try {
      return await this.userModel.findOneAndUpdate(userFilterQuery, user);
    } catch (error) {
      return error;
    }
  }

  async deleteUser(userFilterQuery: FilterQuery<Users>) {
    try {
      return await this.userModel.deleteOne(userFilterQuery);
    } catch (error) {
      return error;
    }
  }
}

export { UsersRepository };
