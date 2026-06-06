import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';

import { Local } from 'src/locales/entities/local/local';

import { ReservaServicio }
from 'src/reserva-servicio/entities/reserva-servicio';

import { Pago }
from 'src/pagos/entities/pago';


import { Usuario }
from 'src/usuarios/entities/usuario/usuario';

@Entity('reservas')
export class Reserva {

    @PrimaryGeneratedColumn()
    id_reserva!: number;

    @Column()
    id_usuario!: number;

    @Column()
    id_local!: number;

    @Column({
        nullable: true
    })
    creado_por!: number;

    @Column()
    fecha_evento!: string;

    @Column({
        nullable: true
    })
    hora_evento!: string;

    @Column({
        nullable: true
    })
    tipo_evento!: string;

    @Column({
        nullable: true
    })
    cantidad_personas!: number;

    @Column({
        default: 'pendiente'
    })
    estado!: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true
    })
    total_pago!: number;

    // 🔥 RELACIÓN USUARIO
    @ManyToOne(() => Usuario)

    @JoinColumn({
        name: 'id_usuario'
    })

    usuario!: Usuario;

    // 🔥 RELACIÓN LOCAL
    @ManyToOne(() => Local)

    @JoinColumn({
        name: 'id_local'
    })

    local!: Local;

    // 🔥 SERVICIOS EXTRA
    @OneToMany(
        () => ReservaServicio,
        reservaServicio =>
            reservaServicio.reserva
    )

    servicios!: ReservaServicio[];

    // 🔥 PAGOS
    @OneToMany(
        () => Pago,
        pago => pago.reserva
    )

    pagos!: Pago[];

}