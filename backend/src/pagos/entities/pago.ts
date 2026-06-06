import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Reserva } from 'src/reservas/entities/reserva/reserva';

@Entity('pagos')
export class Pago {

    @PrimaryGeneratedColumn()
    id_pago!: number;

    @Column('decimal', {
        precision: 10,
        scale: 2
    })
    monto!: number;

    @Column()
    metodo!: string;

    @Column({
        default: 'pendiente'
    })
    estado!: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha_pago!: Date;

    // 🔥 RELACIÓN RESERVA
    @ManyToOne(
        () => Reserva,
        reserva => reserva.pagos
    )
    @JoinColumn({
        name: 'id_reserva'
    })
    reserva!: Reserva;

}