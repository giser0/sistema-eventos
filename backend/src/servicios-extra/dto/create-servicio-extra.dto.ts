import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServicioExtraDto {

  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  precio!: number;
}