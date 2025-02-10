"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const userSchema_1 = require("./userSchema/userSchema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const jwt_2 = require("./jwt/jwt");
let UserService = class UserService {
    constructor(userModel, jwtservice, jwtAuthService) {
        this.userModel = userModel;
        this.jwtservice = jwtservice;
        this.jwtAuthService = jwtAuthService;
    }
    async signUpUser(createUserDto) {
        const { email } = createUserDto;
        try {
            const findEmail = await this.userModel.findOne({ email });
            if (findEmail) {
                return "Email Already Exist ";
            }
            const createUser = new this.userModel(createUserDto);
            return createUser.save();
        }
        catch (error) {
            return error;
        }
    }
    async logInUser(logInUserDto) {
        const { email, password } = logInUserDto;
        try {
            let user = await this.userModel.findOne({ email }).select("+password");
            if (!user) {
                return "Invalid email or password";
            }
            const isvalidate = await this.comparePassword(password, user?.password);
            if (!isvalidate) {
                return "Invalid password";
            }
            const token = await this.jwtAuthService.generateToken(user);
            if (!token) {
                return "token is not created ";
            }
            user = await this.userModel.findByIdAndUpdate(user._id, { token, islogin: true }, { new: true });
            return user;
        }
        catch (error) {
            return error;
        }
    }
    async logOutUser(email) {
        try {
            let token = null;
            await this.userModel.findOneAndUpdate({ email }, { token, islogin: false }, { new: true });
            return { message: 'Logged out successfully' };
        }
        catch (error) {
            return error;
        }
    }
    async comparePassword(plainPassword, hashPassword) {
        return await bcrypt.compare(plainPassword, hashPassword);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(userSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService, jwt_2.JwtAuthService])
], UserService);
//# sourceMappingURL=user.service.js.map