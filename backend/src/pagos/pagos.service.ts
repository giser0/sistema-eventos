import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
    Not,
    Repository
} from 'typeorm';

import { Pago } from './entities/pago';

import { Reserva }
from 'src/reservas/entities/reserva/reserva';

import PDFDocument from 'pdfkit';

@Injectable()
export class PagosService {

    constructor(

        @InjectRepository(Pago)
        private repo: Repository<Pago>,

        @InjectRepository(Reserva)
        private reservaRepo: Repository<Reserva>

    ) {}

    // 🔥 CREAR PAGO
    async crear(data: any) {

        // buscar reserva
        const reserva =
            await this.reservaRepo.findOne({

                where: {
                    id_reserva: data.id_reserva
                },

                relations: {
                    usuario: true
                }

            });

        if (!reserva) {

            throw new Error(
                'Reserva no encontrada'
            );

        }

        // crear pago
        const nuevoPago =
            this.repo.create({

                monto: data.monto,

                metodo: data.metodo,

                estado: 'pagado',

                reserva

            });

        // guardar
        const pagoGuardado =
            await this.repo.save(
                nuevoPago
            );

        // confirmar reserva
        reserva.estado =
            'confirmado';

        await this.reservaRepo.save(
            reserva
        );

        return pagoGuardado;

    }

    // 🔥 OBTENER PAGOS
    findAll() {

        return this.repo.find({

            where: {
                estado: Not('eliminado')
            },
            

            relations: {

                reserva: {
                    usuario: true
                }

            },

            order: {
                
                fecha_pago: 'DESC'
            }
            

        });

    }

    // 🔥 ELIMINAR PAGO
    async eliminarPago(
        id_pago: number
    ) {

        const pago =
            await this.repo.findOne({

                where: {
                    id_pago
                }

            });

        if (!pago) {

            throw new Error(
                'Pago no encontrado'
            );

        }

        pago.estado =
            'eliminado';

        return await this.repo.save(
            pago
        );

    }

    // 🔥 GENERAR PDF
    async generarComprobante(
        id: number
    ): Promise<Buffer> {

        const pago =
            await this.repo.findOne({

                where: {
                    id_pago: id
                },

                relations: {

                    reserva: {
                        usuario: true
                    }

                }

            });

        if (!pago) {

            throw new Error(
                'Pago no encontrado'
            );

        }

        return new Promise((resolve) => {

            const doc =
                new PDFDocument();

            const buffers: Buffer[] = [];

            doc.on(
                'data',
                (chunk) => {

                    buffers.push(chunk);

                }
            );

            doc.on(
                'end',
                () => {

                    resolve(
                        Buffer.concat(buffers)
                    );

                }
            );

            // PDF
            doc
                .fontSize(20)
                .text(
                    'COMPROBANTE DE PAGO',
                    {
                        align: 'center'
                    }
                );

            doc.moveDown();

            doc.text(
                `Cliente: ${
                    pago.reserva?.usuario?.nombre
                }`
            );

            doc.text(
                `Reserva ID: ${
                    pago.reserva?.id_reserva
                }`
            );

            doc.text(
                `Monto: Bs. ${pago.monto}`
            );

            doc.text(
                `Metodo: ${pago.metodo}`
            );

            doc.text(
                `Estado: ${pago.estado}`
            );

            doc.text(
                `Fecha: ${
                    new Date(
                        pago.fecha_pago
                    ).toLocaleString()
                }`
            );

            doc.moveDown();

            doc.text(
                'Gracias por su pago.'
            );

            doc.end();

        });

    }

}