import { PickType } from "@nestjs/mapped-types";
import { CreateUser } from "./create-user.dto";


export class LoginUserDto extends PickType(CreateUser, ['email', 'password']) {}