import { CreateRecipeDto } from './dto/createRecipe.dto';
import { Recipe } from './Schema/recipeSchema';
import { Model } from 'mongoose';
import { User } from 'src/user/userSchema/userSchema';
export declare class RecipeService {
    private recipeModle;
    private userModel;
    constructor(recipeModle: Model<Recipe>, userModel: Model<User>);
    getRecipe(query: any): Promise<any>;
    createRecipe(createRecipeDto: CreateRecipeDto, user: any): Promise<any>;
}
