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
  async findOne(productFilterQuery: Partial<Products>): Promise<Products> {
    try {
      return await this.productModel.findOne({ productFilterQuery });
    } catch (error) {
      return error;
    }
  }

  async updateProduct(
    productFilterQuery: FilterQuery<Products>,
    product: Partial<Products>,
  ): Promise<Products> {
    try {
      return await this.productModel.findOneAndUpdate(
        productFilterQuery,
        product,
      );
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(productFilterQuery: FilterQuery<Products>): Promise<any> {
    try {
      return await this.productModel.deleteOne(productFilterQuery);
    } catch (error) {
      return error;
    }
  }
}

export { ProductsRepository };
