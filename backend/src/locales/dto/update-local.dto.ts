import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateLocalDto {

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsNumber()
  capacidad?: number;

  @IsOptional()
  @IsNumber()
  precio?: number;
}