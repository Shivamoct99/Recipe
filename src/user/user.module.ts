import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './userSchema/userSchema';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './jwt/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthService } from './jwt/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
  }),],
  controllers: [UserController],
  providers: [UserService,JwtAuthService]

})
export class UserModule { }
