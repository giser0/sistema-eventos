import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaServicio } from './entities/reserva-servicio';
import { ReservaServicioController } from './reserva-servicio.controller';
import { ReservaServicioService } from './reserva-servicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaServicio])],
  controllers: [ReservaServicioController],
  providers: [ReservaServicioService],
})
export class ReservaServicioModule { }