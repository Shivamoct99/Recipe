
import { Controller, Get, Query, Post, Body, UseGuards,Req } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { JwtAuthGuard } from 'src/user/jwt/jwtGaurd';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) { }
    @Get()
   async getrecipe(@Query() query) {
        return await this.recipeService.getRecipe(query)
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    async createRecipe(@Body() createRecipeDto: CreateRecipeDto ,@Req() req:any ) {
        return await this.recipeService.createRecipe(createRecipeDto ,req.user)
    }
}
