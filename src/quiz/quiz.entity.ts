import {Entity, PrimaryGeneratedColumn, Column, Unique, Index, OneToMany} from 'typeorm';
import {Pregunta} from '../pregunta/pregunta.entity';

@Entity('Quiz')
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 160})
    @Unique('titulo_unique', ['titulo'])
    titulo: string;

    @Column({length: 255})
    descripcion: string;

    @OneToMany(type => Pregunta, pregunta => pregunta.quiz)
    preguntas: Pregunta[];
}