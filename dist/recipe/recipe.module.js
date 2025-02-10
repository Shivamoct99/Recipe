"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModule = void 0;
const common_1 = require("@nestjs/common");
const recipe_controller_1 = require("./recipe.controller");
const recipe_service_1 = require("./recipe.service");
const recipeSchema_1 = require("./Schema/recipeSchema");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_2 = require("../user/jwt/jwt");
const userSchema_1 = require("../user/userSchema/userSchema");
let RecipeModule = class RecipeModule {
};
exports.RecipeModule = RecipeModule;
exports.RecipeModule = RecipeModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: recipeSchema_1.Recipe.name, schema: recipeSchema_1.RecipeSchema }]), mongoose_1.MongooseModule.forFeature([{ name: userSchema_1.User.name, schema: userSchema_1.UserSchema }]), jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1d' },
                }),
            }),],
        controllers: [recipe_controller_1.RecipeController],
        providers: [recipe_service_1.RecipeService, jwt_2.JwtAuthService]
    })
], RecipeModule);
//# sourceMappingURL=recipe.module.js.map