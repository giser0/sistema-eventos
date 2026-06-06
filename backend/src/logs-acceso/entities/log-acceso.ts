import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Usuario }
from 'src/usuarios/entities/usuario/usuario';

@Entity('logs_acceso')
export class LogAcceso {

    @PrimaryGeneratedColumn()
    id_log!: number;

    @Column()
    id_usuario!: number;

    @Column()
    evento!: string;

    @Column({
        nullable: true
    })
    ip!: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha!: Date;

    @Column({
        nullable: true
    })
    browser!: string;

    // 🔥 RELACIÓN USUARIO
    @ManyToOne(() => Usuario)
    @JoinColumn({
        name: 'id_usuario'
    })
    usuario!: Usuario;

}