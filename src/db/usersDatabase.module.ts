import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './repositories';
import { userSchema } from './schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: userSchema }])],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
class UsersDatabaseModule {}

export { UsersDatabaseModule };
