import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthService } from './jwt';


@Injectable()
export class JwtAuthGuard {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; 

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const user = await this.jwtAuthService.verifyToken(token); 
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}