import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './Schema/recipeSchema';
import { Model } from 'mongoose';
import { User } from 'src/user/userSchema/userSchema';


@Injectable()
export class RecipeService {
    constructor(@InjectModel(Recipe.name) private recipeModle: Model<Recipe>,@InjectModel(User.name) private userModel: Model<User>) { }
    async getRecipe(query: any) {
        try {
            let Recipes = {};
            const filters: any = {};
            if (query.chef) {
                console.log(query.chef);
                filters.chef = { $regex: query.chef, $options: 'i' }
            }
            if (query.title) {
                console.log(query.title);
                filters.title = { $regex: query.title, $options: 'i' }
            }
            if (query.labels) {
                console.log(query.labels);
                filters.labels = { $in: query.labels.split(',').map(label => new RegExp(label, "i")) }
            }
            // console.log(filters);
            // Filter by publication date range
            if (query.startDate && query.endDate) {
                filters.publishedAt = {
                    $gte: new Date(query.startDate),
                    $lte: new Date(query.endDate),
                };
            } else if (query.startDate) {
                filters.publishedAt = { $gte: new Date(query.startDate) };
            } else if (query.endDate) {
                filters.publishedAt = { $lte: new Date(query.endDate) };
            }

            // Pagination 
            const page = Math.max(parseInt(query.page, 10) || 1, 1); // Default page = 1, ensure page ≥ 1
            const limit = Math.max(parseInt(query.limit, 10) || 5, 1); // Default limit = 5, ensure limit ≥ 1
            const skip = (page - 1) * limit;

            // Get total count before 
            const total = await this.recipeModle.countDocuments(filters);

            // console.log("filters : ", filters);
            Recipes = await this.recipeModle.find(filters).skip(skip)
                .limit(limit)
                .exec();
            return { Recipes, total, page, limit }
        } catch (error) {
            return error
        }
    }
    async createRecipe(createRecipeDto: CreateRecipeDto,user) {
        const{email,userId}=user
        try {
            const check= await this.userModel.findById(userId)
            if (check?.islogin==false) {
                return "User first log in "
            }
            if (check?.role!=='chef') {
                return "Only chefs can create recipes"
            }
            const createRecipe = new this.recipeModle({...createRecipeDto, chef:check.name})
            return createRecipe.save();
        } catch (error) {
            return error
        }
    }
}
