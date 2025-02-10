import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipe, RecipeSchema } from './Schema/recipeSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthService } from 'src/user/jwt/jwt';
import { User, UserSchema } from 'src/user/userSchema/userSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),],
  controllers: [RecipeController],
  providers: [RecipeService,JwtAuthService]
})
export class RecipeModule { }
