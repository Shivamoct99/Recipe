import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStamp } from 'node:console';

@Schema({ timestamps: true })
export class Recipe {
    @Prop({ required: true })
    title: string;

    @Prop()
    chef: string;

    @Prop({ required: true })
    description: string;

    @Prop([String])
    ingredients: string[];

    @Prop([String])
    steps: string[];

    @Prop([String])
    labels: string[];

    @Prop()
    image: string;
    

    @Prop({ default: new Date() }) // Initially null, set when published
    publishedAt: Date;
}

// Create schema
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
