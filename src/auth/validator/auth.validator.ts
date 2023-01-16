import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

class SingupValidator {
  @IsString()
  @IsNotEmpty({ message: 'You must provide your name' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'You must provide your lastname' })
  lastname: string;

  @IsEmail()
  @IsNotEmpty({ message: 'You must provide an email' })
  email: string;

  @Length(8, 20, {
    message: 'The password should have between 8 and 20 characters',
  })
  password: string;
}

class SinginValidator {
  @IsEmail()
  @IsNotEmpty({ message: 'You must provide a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'You must provide a password' })
  password: string;
}

export { SingupValidator, SinginValidator };
