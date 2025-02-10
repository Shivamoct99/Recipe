import { IsNotEmpty, IsOptional } from "class-validator";
export class CreateRecipeDto {
    @IsNotEmpty()
    title?: string;
    @IsNotEmpty()
    description?: string;
    ingredients?: Array<string>;
    steps?: Array<string>;
    labels?: Array<string>;
    // @IsNotEmpty()
    chef?: string;

    @IsOptional()
    image?: string;
}