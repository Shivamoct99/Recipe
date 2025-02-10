import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    getrecipe(query: any): Promise<any>;
    createRecipe(createRecipeDto: CreateRecipeDto, req: any): Promise<any>;
}
