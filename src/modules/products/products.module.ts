import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [DatabaseModule],
})
class ProductsModule {}

export { ProductsModule };
