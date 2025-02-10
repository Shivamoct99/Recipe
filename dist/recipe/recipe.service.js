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
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const recipeSchema_1 = require("./Schema/recipeSchema");
const mongoose_2 = require("mongoose");
const userSchema_1 = require("../user/userSchema/userSchema");
let RecipeService = class RecipeService {
    constructor(recipeModle, userModel) {
        this.recipeModle = recipeModle;
        this.userModel = userModel;
    }
    async getRecipe(query) {
        try {
            let Recipes = {};
            const filters = {};
            if (query.chef) {
                console.log(query.chef);
                filters.chef = { $regex: query.chef, $options: 'i' };
            }
            if (query.title) {
                console.log(query.title);
                filters.title = { $regex: query.title, $options: 'i' };
            }
            if (query.labels) {
                console.log(query.labels);
                filters.labels = { $in: query.labels.split(',').map(label => new RegExp(label, "i")) };
            }
            if (query.startDate && query.endDate) {
                filters.publishedAt = {
                    $gte: new Date(query.startDate),
                    $lte: new Date(query.endDate),
                };
            }
            else if (query.startDate) {
                filters.publishedAt = { $gte: new Date(query.startDate) };
            }
            else if (query.endDate) {
                filters.publishedAt = { $lte: new Date(query.endDate) };
            }
            const page = Math.max(parseInt(query.page, 10) || 1, 1);
            const limit = Math.max(parseInt(query.limit, 10) || 5, 1);
            const skip = (page - 1) * limit;
            const total = await this.recipeModle.countDocuments(filters);
            Recipes = await this.recipeModle.find(filters).skip(skip)
                .limit(limit)
                .exec();
            return { Recipes, total, page, limit };
        }
        catch (error) {
            return error;
        }
    }
    async createRecipe(createRecipeDto, user) {
        const { email, userId } = user;
        try {
            const check = await this.userModel.findById(userId);
            if (check?.islogin == false) {
                return "User first log in ";
            }
            if (check?.role !== 'chef') {
                return "Only chefs can create recipes";
            }
            const createRecipe = new this.recipeModle({ ...createRecipeDto, chef: check.name });
            return createRecipe.save();
        }
        catch (error) {
            return error;
        }
    }
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(recipeSchema_1.Recipe.name)),
    __param(1, (0, mongoose_1.InjectModel)(userSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], RecipeService);
//# sourceMappingURL=recipe.service.js.map