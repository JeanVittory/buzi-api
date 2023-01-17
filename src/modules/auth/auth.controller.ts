import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingupValidator, SinginValidator } from './validator';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: SingupValidator) {
    try {
      return await this.authService.signup(user);
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException('Your data already exist.');
      throw error;
    }
  }

  @Post('signin')
  async signin(@Body() user: SinginValidator) {
    try {
      return await this.authService.signin(user);
    } catch (error) {
      if (error.code === 33) throw new UnauthorizedException(error.message);
      if (error.code === 11) throw new NotFoundException(error.message);
      throw error;
    }
  }
}

export { AuthController };
