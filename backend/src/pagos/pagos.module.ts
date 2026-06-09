import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Pago } from './entities/pago';

import { Reserva } from 'src/reservas/entities/reserva/reserva';

import { PagosController } from './pagos.controller';

import { PagosService } from './pagos.service';

@Module({

  imports: [

    TypeOrmModule.forFeature([
      Pago,
      Reserva
    ])

  ],

  controllers: [
    PagosController
  ],

  providers: [
    PagosService
  ],

})

export class PagosModule { }