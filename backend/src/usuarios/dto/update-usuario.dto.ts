import {
  IsEmail,
  IsOptional,
  MinLength
} from 'class-validator';

export class UpdateUsuarioDto {

  @IsOptional()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  telefono?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;
}