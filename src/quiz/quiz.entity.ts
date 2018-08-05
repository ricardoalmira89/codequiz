import {Entity, PrimaryGeneratedColumn, Column, Unique, Index} from 'typeorm';

@Entity('Quiz')
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 160})
    @Unique('titulo_unique', ['titulo'])
    titulo: string;

    @Column({length: 255})
    descripcion: string;

}