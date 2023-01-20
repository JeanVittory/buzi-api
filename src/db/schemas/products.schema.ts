import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
class Products {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  place: string;
}

type ProductDocument = Products & Document;
const productSchema = SchemaFactory.createForClass(Products);

export { Products, ProductDocument, productSchema };
