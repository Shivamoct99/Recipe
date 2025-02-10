import { ExecutionContext } from '@nestjs/common';
import { JwtAuthService } from './jwt';
export declare class JwtAuthGuard {
    private readonly jwtAuthService;
    constructor(jwtAuthService: JwtAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
