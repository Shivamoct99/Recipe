export declare class Recipe {
    title: string;
    chef: string;
    description: string;
    ingredients: string[];
    steps: string[];
    labels: string[];
    image: string;
    publishedAt: Date;
}
export declare const RecipeSchema: import("mongoose").Schema<Recipe, import("mongoose").Model<Recipe, any, any, any, import("mongoose").Document<unknown, any, Recipe> & Recipe & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Recipe, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Recipe>> & import("mongoose").FlatRecord<Recipe> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
