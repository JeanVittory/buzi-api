import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignup } from './types';
import { SingupValidator, SinginValidator } from './validator';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: SingupValidator): Promise<UserSignup> {
    try {
      return await this.authService.signup(user);
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException('Your data already exist.');
      throw error;
    }
  }

  @Post('signin')
  async signin(
    @Body() user: SinginValidator,
  ): Promise<{ ACCESS_TOKEN: string }> {
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
