import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaServicio } from './entities/reserva-servicio';

@Injectable()
export class ReservaServicioService {

    constructor(
        @InjectRepository(ReservaServicio)
        private repo: Repository<ReservaServicio>
    ) {}

    crear(data: any) {
        return this.repo.save(data);
    }
}