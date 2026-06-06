import {
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class CreatePagoDto {

  @IsNotEmpty()
  @IsNumber()
  monto!: number;

  @IsNotEmpty()
  @IsString()
  metodo!: string;

  @IsNotEmpty()
  @IsString()
  estado!: string;

  @IsNotEmpty()
  @IsNumber()
  id_reserva!: number;

}