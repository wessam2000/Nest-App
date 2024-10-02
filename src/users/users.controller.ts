import { Roles } from './../common/decorators/roles/roles.decorator';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser as CreateUserDto } from './dto/create-user.dto';
import { UpdateUser as UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticationGuard } from 'src/common/guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization/authorization.guard';

@Controller('users')
// @UsePipes(ValidationPipe)
// @UseGuards(AuthenticationGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  //admin
  @Roles('admin')
  @UseGuards(AuthenticationGuard,AuthorizationGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  //user , admin
  @Roles('user,admin')
  @UseGuards(AuthenticationGuard,AuthorizationGuard)
  findOne(@Param('userId') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  //user
  @Patch(':userId')
  @Roles('user')
  @UseGuards(AuthenticationGuard,AuthorizationGuard)
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  //admin
  @Delete(':userId')
  @Roles('admin')
  @UseGuards(AuthenticationGuard,AuthorizationGuard)
  @HttpCode(204)
  remove(@Param('userId') id: string) {
    console.log(id);

    return this.usersService.remove(id);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<{ token: string }> {
    return await this.authService.login(user);
  }
}
