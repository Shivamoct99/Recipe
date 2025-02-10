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
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const recipe_service_1 = require("./recipe.service");
const createRecipe_dto_1 = require("./dto/createRecipe.dto");
const jwtGaurd_1 = require("../user/jwt/jwtGaurd");
let RecipeController = class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    async getrecipe(query) {
        return await this.recipeService.getRecipe(query);
    }
    async createRecipe(createRecipeDto, req) {
        return await this.recipeService.createRecipe(createRecipeDto, req.user);
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getrecipe", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwtGaurd_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRecipe_dto_1.CreateRecipeDto, Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "createRecipe", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map