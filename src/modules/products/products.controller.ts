import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsDTO } from 'src/shared/types';

import { ProductsService } from './products.service';
import { ProductValidator } from './validator';

@Controller('products')
class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('/')
  async getProducts(): Promise<ProductsDTO[]> {
    try {
      return (await this.productService.findAll()) as ProductsDTO[];
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<ProductsDTO> {
    try {
      const response = await this.productService.findOneById(id);
      return response;
    } catch (error) {
      if (error.code === 11) throw new NotFoundException(error.message);
      if (error.code === 50) throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Post('/')
  async createProduct(@Body() product: ProductValidator): Promise<ProductsDTO> {
    try {
      return (await this.productService.create(product)) as ProductsDTO;
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateData: Partial<ProductValidator>,
  ): Promise<{ id: string }> {
    try {
      const response = await this.productService.updateProductById(
        id,
        updateData,
      );
      return response;
    } catch (error) {
      if (error.code === 11) throw new NotFoundException(error.message);
      if (error.code === 50) throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<{ id: string }> {
    try {
      const response = await this.productService.deleteOneById(id);
      return response;
    } catch (error) {
      if (error.code === 11) throw new NotFoundException(error.message);
      if (error.code === 50) throw new BadRequestException(error.message);
      throw error;
    }
  }
}

export { ProductsController };
