import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicioExtra } from './entities/servicio-extra';

@Injectable()
export class ServiciosExtraService {

    constructor(
        @InjectRepository(ServicioExtra)
        private repo: Repository<ServicioExtra>
    ) {}

    findAll() {
        return this.repo.find();
    }

    create(data: any) {
        return this.repo.save(data);
    }
}