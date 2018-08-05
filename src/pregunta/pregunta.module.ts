import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pregunta } from './pregunta.entity';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';
import { PreguntaResolver } from './pregunta.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Pregunta])],
    providers: [PreguntaService, PreguntaResolver],
    controllers: [PreguntaController],
})
export class PreguntaModule {}