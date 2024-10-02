import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;
}

export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
