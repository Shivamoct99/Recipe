import { UserService } from './user.service';
import { CreateUserDto, LogInUserDto } from './dto/createUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    logInUser(logInUserDto: LogInUserDto): Promise<any>;
    logOutUser(data: any): Promise<any>;
    signUpUser(createUserDto: CreateUserDto): Promise<any>;
}
