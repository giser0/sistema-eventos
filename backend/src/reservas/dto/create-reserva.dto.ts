import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateReservaDto {

  @IsNumber()
  id_usuario!: number;

  @IsNumber()
  id_local!: number;

  @IsOptional()
  @IsNumber()
  creado_por?: number;

  @IsNotEmpty()
  @IsString()
  fecha_evento!: string;

  @IsOptional()
  @IsString()
  hora_evento?: string;

  @IsOptional()
  @IsString()
  tipo_evento?: string;

  @IsOptional()
  @IsNumber()
  cantidad_personas?: number;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumber()
  total_pago?: number;

}