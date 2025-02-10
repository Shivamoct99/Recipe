import { Injectable } from '@nestjs/common';
import { CreateUserDto, LogInUserDto } from './dto/createUser.dto';
import { User } from './userSchema/userSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthService } from './jwt/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly jwtservice: JwtService, private readonly jwtAuthService:JwtAuthService) { }
    async signUpUser(createUserDto: CreateUserDto) {
        const { email } = createUserDto;
        try {
            const findEmail = await this.userModel.findOne({ email })
            // console.log(findEmail);
            if (findEmail) {
                return "Email Already Exist "
            }
            const createUser = new this.userModel(createUserDto)
            return createUser.save();
        } catch (error) {
            return error
        }

    }
    async logInUser(logInUserDto: LogInUserDto) {
        const { email, password } = logInUserDto;
        try {
            let user = await this.userModel.findOne({ email }).select("+password");
            if (!user) {
                return "Invalid email or password"
            }
            // check password
            const isvalidate = await this.comparePassword(password, user?.password)
            // console.log(isvalidate);
            if (!isvalidate) {
                return "Invalid password"
            }
            // Generate JWT token
            const token = await this.jwtAuthService.generateToken(user)
            // console.log(token);

            if (!token) {
                return "token is not created "
            }

            user = await this.userModel.findByIdAndUpdate(user._id, { token,islogin:true }, { new: true });
            return user;

        } catch (error) {
            // console.log(error);
            return error
        }
    }
    // LogOut
    async logOutUser(email: string) {
        try {
            let token = null
            await this.userModel.findOneAndUpdate({ email }, { token,islogin:false }, { new: true });
            return { message: 'Logged out successfully' };
        }
        catch (error) {
            return error
        }
    }
    //  Method to compare passwords
    async comparePassword(plainPassword: string, hashPassword: any): Promise<boolean> {
        // console.log(plainPassword, hashPassword);
        return await bcrypt.compare(plainPassword, hashPassword);
    }
}
