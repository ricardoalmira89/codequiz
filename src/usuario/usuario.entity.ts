import {Entity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';

@Entity('Usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 160})
    nombre: string;

    @Column({length: 100})
    email: string;

    @Column({length: 100})
    password: string;

    @Column({})
    edad: number;
}