import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { ProductsRepository } from 'src/db/repositories';
import { ErrorHandler } from 'src/shared/tools';
import { Products, ProductsDTO } from 'src/shared/types';
import { productsDTO, productsPatchDTO } from './dto';
import { ProductValidator } from './validator';

@Injectable()
class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(product: ProductValidator) {
    try {
      const response = await this.productsRepository.create(product);
      return productsDTO(response);
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<ProductsDTO | ProductsDTO[]> {
    try {
      const response = await this.productsRepository.findAll();
      return productsDTO(response);
    } catch (error) {
      throw error;
    }
  }

  async findOne(productFilterQuery: Partial<Products>): Promise<ProductsDTO> {
    try {
      const isProduct = await this.productsRepository.findOne(
        productFilterQuery,
      );
      if (!isProduct)
        throw new ErrorHandler({
          message: 'The product do not exist',
          code: 11,
        });
      return productsDTO(isProduct) as ProductsDTO;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(
    productFilterQuery: FilterQuery<Products>,
    product: Partial<Products>,
  ) {
    try {
      const response = await this.productsRepository.updateProduct(
        productFilterQuery,
        product,
      );
      return productsPatchDTO(response);
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(productFilterQuery: FilterQuery<Products>) {
    try {
      return await this.productsRepository.deleteProduct(productFilterQuery);
    } catch (error) {
      throw error;
    }
  }
}

export { ProductsService };
