import {
  IsNumber,
  ValidateNested
} from 'class-validator';

import { Type }
from 'class-transformer';

class ReservaDto {

  @IsNumber()
  id_reserva!: number;

}

class ServicioDto {

  @IsNumber()
  id_servicio!: number;

}

export class CreateReservaServicioDto {

  @ValidateNested()

  @Type(() => ReservaDto)

  reserva!: ReservaDto;

  @ValidateNested()

  @Type(() => ServicioDto)

  servicio!: ServicioDto;

}