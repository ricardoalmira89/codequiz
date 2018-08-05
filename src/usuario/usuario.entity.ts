import {Entity, PrimaryGeneratedColumn, Column, Unique, Index} from 'typeorm';

@Entity('Usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 160})
    nombre: string;

    @Column({length: 100})
    @Unique('email_unique', ['email'])
    email: string;

    @Column({length: 100})
    password: string;

    @Column({})
    edad: number;
}