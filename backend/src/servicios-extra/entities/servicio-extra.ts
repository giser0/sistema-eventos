import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity('servicios_extra')
export class ServicioExtra {

    @PrimaryGeneratedColumn()
    id_servicio!: number;

    @Column()
    nombre!: string;

    //  precio del servicio
    @Column('decimal', {
        precision: 10,
        scale: 2
    })
    precio!: number;

}