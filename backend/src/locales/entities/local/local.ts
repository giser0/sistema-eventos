import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity('locales')
export class Local {

    @PrimaryGeneratedColumn()
    id_local!: number;

    @Column()
    nombre!: string;

    @Column()
    direccion!: string;

    @Column()
    telefono!: string;

    @Column()
    capacidad!: number;

    //  precio del local
    @Column('decimal', {
        precision: 10,
        scale: 2,
        default: 3000
    })
    precio!: number;

}