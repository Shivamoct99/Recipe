import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LogInUserDto } from './dto/createUser.dto';
import { JwtAuthGuard } from './jwt/jwtGaurd';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('/login')
    async logInUser(@Body() logInUserDto: LogInUserDto) {
        // console.log("logInUserDto : ", logInUserDto);
        const resp = await this.userService.logInUser(logInUserDto)
        // console.log("resp : ", resp);
        return resp
    }
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logOutUser(@Body() data) {
        return this.userService.logOutUser(data.email);
    }
    @Post('/signup')
    async signUpUser(@Body() createUserDto: CreateUserDto) {
        // console.log("createUserDto : ", createUserDto);
        const resp = await this.userService.signUpUser(createUserDto)
        // console.log("resp : ", resp);
        return resp
    }
}
