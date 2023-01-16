import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersDatabaseModule } from 'src/db';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersDatabaseModule, JwtModule.register({})],
})
class AuthModule {}

export { AuthModule };
