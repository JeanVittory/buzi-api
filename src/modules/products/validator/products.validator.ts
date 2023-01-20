import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class ProductValidator {
  @IsString({ message: 'The name should be a string.' })
  @IsNotEmpty({ message: 'You must provide a name.' })
  name: string;

  @IsNotEmpty({ message: 'You must provide a date.' })
  @IsDateString()
  date: Date;

  @IsString({ message: 'The address should be a string.' })
  @IsNotEmpty({ message: 'You must provide a valid address.' })
  address: string;

  @IsNotEmpty({ message: 'You must provide a valide price.' })
  @IsNumber()
  price: number;

  @IsNotEmpty({ message: 'You must provide an image.' })
  @IsString()
  thumbnail: string;
}

export { ProductValidator };
