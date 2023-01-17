import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './repositories';
import { ProductsRepository } from './repositories';
import { userSchema } from './schemas';
import { productSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'products', schema: productSchema }]),
  ],
  providers: [UsersRepository, ProductsRepository],
  exports: [UsersRepository, ProductsRepository],
})
class DatabaseModule {}

export { DatabaseModule };
