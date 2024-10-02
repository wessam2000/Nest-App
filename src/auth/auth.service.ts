import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async login({ email, password }) {
    try {

      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid email or password');
      }
      
      const token = this.jwt.sign({ id: user._id, role: user.role });

      return {
        token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
