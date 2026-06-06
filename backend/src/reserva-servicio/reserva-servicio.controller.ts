import {
  Body,
  Controller,
  Post
} from '@nestjs/common';

import { ReservaServicioService }
from './reserva-servicio.service';

import { CreateReservaServicioDto }
from './dto/create-reserva-servicio.dto';

@Controller('reserva-servicio')

export class ReservaServicioController {

  constructor(
    private service: ReservaServicioService
  ) {}

  @Post()
  crear(

    @Body()
    body: CreateReservaServicioDto

  ) {

    return this.service.crear(body);

  }

}