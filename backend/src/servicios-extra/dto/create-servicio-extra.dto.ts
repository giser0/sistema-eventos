import {
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class CreateServicioExtraDto {

  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsNotEmpty()
  @IsNumber()
  precio!: number;

}