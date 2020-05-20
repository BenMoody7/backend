import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(name: string, pass: string) {
    const newUser = new this.userModel({
      name,
      pass,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getSingleUser(name: string, pass: string) {
    const user = await this.findUserByNameAndPassword(name, pass);
    return {
      id: user.id,
    };
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async updateUser(userId: string, classes: []) {
    const updatedUser = await this.findUser(userId);
    if (classes) {
      updatedUser.classes.splice(0, updatedUser.classes.length);
      classes.forEach(element => {
        updatedUser.classes.push(Object.assign({}, element));
      });
    }
    updatedUser.save();
    return updatedUser.classes;
  }
  async getClasses(userId: string) {
    const user = await this.findUser(userId);
    return user.classes;
  }

  private async findUserByNameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    let user;
    try {
      user = await this.userModel
        .findOne({ name: username, pass: password })
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find user. CAUGHT');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
