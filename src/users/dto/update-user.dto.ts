import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUser } from './create-user.dto';

export class UpdateUser extends PartialType(
  OmitType(CreateUser, ['password'] as const),
) {

}
