import { Controller, Get } from '@nestjs/common';
import { Pregunta } from './pregunta.entity';
import { PreguntaService } from './pregunta.service';

@Controller('preguntas')
export class PreguntaController {

    constructor(private readonly service: PreguntaService) {}

}