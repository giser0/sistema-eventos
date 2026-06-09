import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from 'src/reservas/entities/reserva/reserva';
import { ServicioExtra } from 'src/servicios-extra/entities/servicio-extra';

@Entity('reserva_servicio')
export class ReservaServicio {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(
        () => Reserva,
        reserva => reserva.servicios
    )

    @JoinColumn({
        name: 'id_reserva'
    })

    reserva!: Reserva;

    @ManyToOne(() => ServicioExtra)
    @JoinColumn({ name: 'id_servicio' })
    servicio!: ServicioExtra;

}