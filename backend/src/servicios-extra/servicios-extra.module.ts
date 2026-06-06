import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioExtra } from './entities/servicio-extra';
import { ServiciosExtraController } from './servicios-extra.controller';
import { ServiciosExtraService } from './servicios-extra.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioExtra])],
  controllers: [ServiciosExtraController],
  providers: [ServiciosExtraService],
})
export class ServiciosExtraModule {}