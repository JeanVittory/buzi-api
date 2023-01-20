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
  async getProduct(@Param('id') _id: string) {
    try {
      const response = await this.productService.findOne({ _id });
      if (response instanceof Error) throw response;
    } catch (error) {
      if (error.code === 11) throw new NotFoundException(error.message);
      return error;
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
      const response = await this.productService.deleteOne({ _id });

      if (response.kind === 'ObjectId') {
        throw response;
      }
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException('Object id invalid');
      }
      throw error;
    }
  }
}

export { ProductsController };
