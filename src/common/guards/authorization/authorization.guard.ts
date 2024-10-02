import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector:Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const role = request.user.role;
    const roles = this.reflector.get<string[]>('roles',context.getHandler());
    if(!roles.includes(role)){
      throw new UnauthorizedException("you don't have permission to access this resource");
    }
    return true;
  }
}
