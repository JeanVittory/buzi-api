import { Injectable } from '@nestjs/common';
import { FilterQuery, isValidObjectId } from 'mongoose';
import { ProductsRepository } from 'src/db/repositories';
import { InvalidIdException, NotFoundException } from 'src/shared/tools';
import { Products, ProductsDTO } from 'src/shared/types';

import { productsDTO, productIdDTO } from './dto';
import { ProductValidator } from './validator';

@Injectable()
class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

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

  async findOne(
    productFilterQuery: FilterQuery<Products>,
  ): Promise<ProductsDTO> {
    try {
      const isProduct = await this.productsRepository.findOne(
        productFilterQuery,
      );
      if (isProduct === null) throw new NotFoundException();
      return productsDTO(isProduct) as ProductsDTO;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string) {
    try {
      if (!isValidObjectId(id)) throw new InvalidIdException();
      const response = await this.productsRepository.findOneById(id);
      if (response === null) throw new NotFoundException();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProductById(
    id: string,
    product: Partial<Products>,
  ): Promise<{ id: string }> {
    try {
      if (!isValidObjectId(id)) throw new InvalidIdException();
      const response = await this.productsRepository.updateProductById(
        id,
        product,
      );
      if (response === null) throw new NotFoundException();
      return productIdDTO(response) as { id: string };
    } catch (error) {
      throw error;
    }
  }

  async deleteOneById(id: string): Promise<{ id: string }> {
    try {
      if (!isValidObjectId(id)) throw new InvalidIdException();
      const response = await this.productsRepository.deleteProduct(id);
      if (response === null) throw new NotFoundException();
      return productIdDTO(response) as { id: string };
    } catch (error) {
      throw error;
    }
  }
}

export { ProductsService };
