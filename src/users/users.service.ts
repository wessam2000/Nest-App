import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUser as CreateUserDto } from './dto/create-user.dto';
import { UpdateUser as UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(createUser: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUser.password, salt);
      createUser.password = hashedPassword;
      const newUser = new this.userModel(createUser);
      return newUser.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUser,
        { new: true },
      );
      if (!existingUser) throw new NotFoundException('User not found');
      return existingUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.userModel.findByIdAndDelete(id);
      if (!result) throw new NotFoundException('User not found');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
