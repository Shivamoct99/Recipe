import { CreateUserDto, LogInUserDto } from './dto/createUser.dto';
import { User } from './userSchema/userSchema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthService } from './jwt/jwt';
export declare class UserService {
    private userModel;
    private readonly jwtservice;
    private readonly jwtAuthService;
    constructor(userModel: Model<User>, jwtservice: JwtService, jwtAuthService: JwtAuthService);
    signUpUser(createUserDto: CreateUserDto): Promise<any>;
    logInUser(logInUserDto: LogInUserDto): Promise<any>;
    logOutUser(email: string): Promise<any>;
    comparePassword(plainPassword: string, hashPassword: any): Promise<boolean>;
}
