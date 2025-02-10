import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
@Schema()
export class User {
    @Prop()
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({  default: 'chef', enum: ['user', 'chef', 'admin'] })
    role: string;

    @Prop({default:false})
    islogin: boolean;
    
    @Prop()
    token: string;
    //  Method to compare passwords
    // async comparePassword(plainPassword: string): Promise<boolean> {
    //     console.log(plainPassword);
    //     return await bcrypt.compare(plainPassword, this.password);
    // }
}

// Create schema
export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is changed

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
})