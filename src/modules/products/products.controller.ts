import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsDTO } from 'src/shared/types';
import { ProductsService } from './products.service';
import { ProductValidator } from './validator';

@Controller('products')
class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get('/')
  async getProducts(): Promise<ProductsDTO[] | ProductsDTO> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') _id: string) {
    try {
      return await this.productService.findOne({ _id });
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async createProduct(@Body() product: ProductValidator): Promise<ProductsDTO> {
    try {
      return await this.productService.create(product);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') _id: string,
    @Body() updateData: Partial<ProductValidator>,
  ) {
    try {
      return await this.productService.updateOne({ _id }, updateData);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') _id: string) {
    try {
      await this.productService.deleteOne({ _id });
    } catch (error) {
      throw error;
    }
  }
}

export { ProductsController };
