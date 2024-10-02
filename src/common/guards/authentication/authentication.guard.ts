import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token = request.headers.authorization;
    if(!token){
      throw new UnauthorizedException('you need to login first');
    }
    try {
      const user= this.jwt.verify(token,{
        secret:process.env.JWT_SECRET});
      request.user=user;
      
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
