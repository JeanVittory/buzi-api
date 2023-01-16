import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/db/repositories';
import { Users } from './types';
import * as argon2 from 'argon2';
import { usersDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { SigninUser } from './types/signinUser.types';
import { ErrorHandler } from 'src/tools';

@Injectable()
class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwt: JwtService,
  ) {}

  async signup(user: Omit<Users, '_id'>) {
    try {
      const { password } = user;
      const pwdHashed = await argon2.hash(password);
      const newUser = { ...user, password: pwdHashed };
      const response = await this.usersRepository.create(newUser);
      if (response instanceof Error) throw response;
      return usersDTO(response);
    } catch (error) {
      return error;
    }
  }

  async signin(user: SigninUser) {
    try {
      const { email, password } = user;

      const isUser = await this.usersRepository.findOne({ email });
      if (!isUser)
        throw new ErrorHandler({ message: 'The user do not exist', code: 11 });
      const pwdMatches = await argon2.verify(isUser.password, password);
      if (!pwdMatches)
        throw new ErrorHandler({ message: 'Credential error', code: 33 });
      //JWT
      return usersDTO(isUser);
    } catch (error) {
      return error;
    }
  }
}

export { AuthService };
