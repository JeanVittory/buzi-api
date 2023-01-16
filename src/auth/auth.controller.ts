import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingupValidator, SinginValidator } from './validator';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: SingupValidator) {
    try {
      const response = await this.authService.signup(user);
      if (response instanceof Error) throw response;
      return response;
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException('Your data already exist.');
      throw error;
    }
  }

  @Post('signin')
  async signin(@Body() user: SinginValidator) {
    try {
      const response = await this.authService.signin(user);
      if (response instanceof Error) throw response;
      return response;
    } catch (error) {
      if (error.code === 33) throw new ForbiddenException(error.message);
      throw error;
    }
  }
}

export { AuthController };
