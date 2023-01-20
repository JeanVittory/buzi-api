import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductAcquired } from 'src/shared/types';

@Schema({
  timestamps: true,
  versionKey: false,
})
class Users {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  productsAcquired: ProductAcquired[];
}

type UserDocument = Users & Document;

const userSchema = SchemaFactory.createForClass(Users);

export { Users, userSchema, UserDocument };
