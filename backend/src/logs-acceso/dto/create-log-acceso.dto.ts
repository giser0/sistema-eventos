import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateLogAccesoDto {

  @IsNotEmpty()
  @IsNumber()
  id_usuario!: number;

  @IsNotEmpty()
  @IsString()
  evento!: string;

  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  browser?: string;

}