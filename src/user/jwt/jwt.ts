import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService, private configService:ConfigService) {}

  // Generate JWT token
  async generateToken(user: any) {
    // console.log(user);
    const payload = { email: user.email, userId: user._id };
    // console.log(payload);
        let token=await this.jwtService.sign(payload); 
        // console.log("token : ",token);
        return token
          }

  // verify token
  async verifyToken(token: string) {
    let secret_key = await this.configService.get('JWT_SECRET')
    try {
      const user = jwt.verify(token,secret_key ); 
      return user; 
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
