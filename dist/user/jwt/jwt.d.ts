import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
export declare class JwtAuthService {
    private readonly jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateToken(user: any): Promise<string>;
    verifyToken(token: string): Promise<string | jwt.JwtPayload>;
}
