import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [DatabaseModule, MulterModule.register()],
})
class ProductsModule {}

export { ProductsModule };
