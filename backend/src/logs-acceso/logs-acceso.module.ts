import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAcceso } from './entities/log-acceso';
import { LogsAccesoController } from './logs-acceso.controller';
import { LogsAccesoService } from './logs-acceso.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogAcceso])],
  controllers: [LogsAccesoController],
  providers: [LogsAccesoService],
})
export class LogsAccesoModule { }