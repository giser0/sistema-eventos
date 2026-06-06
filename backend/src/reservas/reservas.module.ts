import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { ReservasController } from './reservas.controller';

import { ReservasService } from './reservas.service';

import { Reserva } from './entities/reserva/reserva';

@Module({

  imports: [

    TypeOrmModule.forFeature([Reserva]),

    JwtModule.register({

      secret: 'mi_clave_secreta',

      signOptions: {
        expiresIn: '1d'
      }

    })

  ],

  controllers: [ReservasController],

  providers: [ReservasService],

})

export class ReservasModule {}