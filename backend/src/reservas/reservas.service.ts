import {
    BadRequestException,
    Injectable
} from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import {
    Repository,
    Not
} from 'typeorm';

import { Reserva } from './entities/reserva/reserva';

@Injectable()
export class ReservasService {

    constructor(
        @InjectRepository(Reserva)
        private reservaRepository: Repository<Reserva>
    ) { }

    // 🔥 TODAS LAS RESERVAS
    obtenerReservas() {

        return this.reservaRepository.find({

            where: {

                estado: Not('eliminado')

            },
            order: {
                id_reserva: 'DESC'
            },

            relations: {

                usuario: true,

                local: true,

                servicios: {

                    servicio: true

                },

                pagos: true

            }

        });

    }

    //  MIS RESERVAS
    obtenerMisReservas(id_usuario: number) {
        return this.reservaRepository.find({
            where: {
                id_usuario,
                estado: Not('eliminado')
            },
            order: {
                id_reserva: 'DESC'

            },
            relations: {
                usuario: true,
                local: true,
                servicios: {
                    servicio: true
                },
                pagos: true
            }
        });
    }

    //  CREAR RESERVA
    async crearReserva(reserva: Partial<Reserva>) {

        const reservaExistente =
            await this.reservaRepository.findOne({

                where: {
                    fecha_evento: reserva.fecha_evento,
                    estado: Not('eliminado')
                }

            });
        if (reservaExistente) {
            throw new BadRequestException(
                'Ya existe una reserva en esa fecha'
            );
        }

        const nuevaReserva =
            this.reservaRepository.create(reserva);

        return await this.reservaRepository.save(
            nuevaReserva
        );
    }

    //  CAMBIAR ESTADO
    async cambiarEstado(
        id_reserva: number,
        estado: string
    ) {
        const reserva =
            await this.reservaRepository.findOne({
                where: { id_reserva }
            });

        if (!reserva) {
            throw new Error('Reserva no encontrada');
        }

        reserva.estado = estado;

        return await this.reservaRepository.save(reserva);
    }
    //  ELIMINAR RESERVA (LÓGICO)
    async eliminarReserva(
        id_reserva: number
    ) {

        const reserva =
            await this.reservaRepository.findOne({
                where: { id_reserva }
            });

        if (!reserva) {

            throw new Error(
                'Reserva no encontrada'
            );

        }

        reserva.estado = 'eliminado';

        return await this.reservaRepository.save(
            reserva
        );

    }
    //  RESERVAS PENDIENTES DE PAGO
    async obtenerPendientesPago() {

        const reservas =
            await this.reservaRepository.find({

                relations: {
                    usuario: true,
                    pagos: true
                }


            });

        // solo reservas SIN pagos
        return reservas.filter(
            reserva =>
                !reserva.pagos ||
                reserva.pagos.length === 0
        );

    }
    //  DASHBOARD

    //  DASHBOARD
    async obtenerDashboard() {

        const total_reservas =
            await this.reservaRepository.count({
                where: {
                    estado: Not('eliminado')
                }
            });

        const pendientes =
            await this.reservaRepository.count({
                where: {
                    estado: 'pendiente'
                }
            });

        const confirmadas =
            await this.reservaRepository.count({
                where: {
                    estado: 'confirmado'
                }
            });

        const canceladas =
            await this.reservaRepository.count({
                where: {
                    estado: 'cancelado'
                }
            });

        const reservas =
            await this.reservaRepository.find({
                where: {
                    estado: Not('eliminado')
                }
            });

        let ingresos_totales = 0;

        reservas.forEach(reserva => {
            ingresos_totales +=
                Number(reserva.total_pago || 0);
        });

        return {
            total_reservas,
            pendientes,
            confirmadas,
            canceladas,
            ingresos_totales
        };
    }
}