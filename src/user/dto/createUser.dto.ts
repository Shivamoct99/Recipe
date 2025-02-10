import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
export class CreateUserDto {

    @IsNotEmpty()
    name?: string;

    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsNotEmpty()
    password?: string;
}
export class LogInUserDto {

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}