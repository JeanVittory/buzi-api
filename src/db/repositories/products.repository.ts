import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ProductValidator } from 'src/modules/products/validator';
import { Products } from 'src/shared/types';

import { ProductDocument } from '../schemas';

@Injectable()
class ProductsRepository {
  constructor(
    @InjectModel('products') private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Products[]> {
    try {
      return await this.productModel.find();
    } catch (error) {
      return error;
    }
  }
  async create(product: ProductValidator): Promise<ProductDocument> {
    try {
      const newProduct = new this.productModel(product);
      return await newProduct.save();
    } catch (error) {
      return error;
    }
  }

  async findOne(
    productFilterQuery: FilterQuery<Products>,
  ): Promise<ProductDocument> {
    try {
      const response = await this.productModel.findOne({
        ...productFilterQuery,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async findOneById(id: string) {
    try {
      const response = await this.productModel.findById({ _id: id });
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateProductById(
    id: string,
    product: Partial<Products>,
  ): Promise<ProductDocument> {
    try {
      const response = await this.productModel.findByIdAndUpdate(
        { _id: id },
        product,
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id: string): Promise<ProductDocument> {
    try {
      const response = await this.productModel.findByIdAndDelete({ _id: id });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { ProductsRepository };
