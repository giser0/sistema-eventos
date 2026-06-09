import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario!: number;

    @Column()
    nombre!: string;

    @Column({
        unique: true
    })
    email!: string;

    @Column()
    password!: string;

    @Column({
        nullable: true
    })
    telefono!: string;

    @Column({
        default: 'cliente'
    })
    rol!: string;
    @Column({
        default: true
    })
    activo!: boolean;
    @Column({
        nullable: true
    })
    resetToken!: string;

    @Column({
        nullable: true,
        type: 'timestamp'
    })
    resetTokenExpiration!: Date;

}