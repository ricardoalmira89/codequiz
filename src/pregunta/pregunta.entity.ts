import {Entity, PrimaryGeneratedColumn, Column, Unique, Index, ManyToOne} from 'typeorm';
import {Quiz} from '../quiz/quiz.entity';
import {IsNull} from 'typeorm/browser';

@Entity('Pregunta')
export class Pregunta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    @Unique('texto_unique', ['texto'])
    texto: string;

    @Column({length: 255})
    respuesta_texto: string;

    @ManyToOne(type => Quiz, quiz => quiz.preguntas, {nullable: false})
    quiz: Quiz;

}