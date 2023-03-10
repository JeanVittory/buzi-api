import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/db/repositories';
import * as argon2 from 'argon2';
import { usersDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { CredentialsException, NotFoundException } from 'src/shared/tools';
import { ConfigService } from '@nestjs/config';
import { SinginValidator, SingupValidator } from './validator';
import { UserSignup } from './types';

@Injectable()
class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(user: SingupValidator): Promise<UserSignup> {
    try {
      const { password } = user;
      const pwdHashed = await argon2.hash(password);
      const newUser = { ...user, password: pwdHashed };
      const response = await this.usersRepository.create(newUser);
      if (response instanceof Error) throw response;
      return usersDTO(response) as UserSignup;
    } catch (error) {
      throw error;
    }
  }

  async signin(user: SinginValidator): Promise<{ ACCESS_TOKEN: string }> {
    try {
      const { email, password } = user;
      const isUser = await this.usersRepository.findOne({ email });
      if (!isUser) throw new NotFoundException();
      const pwdMatches = await argon2.verify(isUser.password, password);
      if (!pwdMatches) throw new CredentialsException();
      return this.signToken(isUser);
    } catch (error) {
      throw error;
    }
  }

  async signToken({
    _id,
    email,
  }: {
    _id: string;
    email: string;
  }): Promise<{ ACCESS_TOKEN: string }> {
    try {
      const payload = {
        sub: _id,
        email,
      };
      const token = await this.jwt.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '15m',
      });
      return { ACCESS_TOKEN: token };
    } catch (error) {
      throw error;
    }
  }
}

export { AuthService };
