import {Entity, PrimaryGeneratedColumn, Column, Unique, Index} from 'typeorm';

@Entity('Pregunta')
export class Pregunta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    @Unique('texto_unique', ['texto'])
    texto: string;

    @Column({length: 255})
    respuesta_texto: string;

}