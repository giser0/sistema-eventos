    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { LogAcceso } from './entities/log-acceso';

    @Injectable()
    export class LogsAccesoService {

        constructor(
            @InjectRepository(LogAcceso)
            private repo: Repository<LogAcceso>
        ) {}

        crearLog(data: any) {
            return this.repo.save(data);
        }

    findAll() {

    return this.repo.find({

        take: 50,

        relations: {
            usuario: true
        },

        order: {
            fecha: 'DESC'
        }

    });

}

    }