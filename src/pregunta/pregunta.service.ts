import { Injectable} from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';

import { Pregunta } from './pregunta.entity';
import { Param } from '@nestjs/common/utils/decorators/route-params.decorator';

@Injectable()
export class PreguntaService {
    constructor(
        @InjectRepository(Pregunta)
        private readonly repository: Repository<Pregunta>) {}

    async findAll(): Promise<Pregunta[]> {
        return await this.repository.find();
    }

    async findOneById(@Param('id') id): Promise<Pregunta> {
        return await this.repository.findOneOrFail(id);
    }

    async search(query: any): Promise<Pregunta[]>{

        return await this.repository
           .createQueryBuilder('e')
           // .where('e.email = :email', {email: query.usuario.email})
           .orWhere('e.texto LIKE :texto', {texto: '%' + query.texto + '%'})
           // .orWhere('e.edad > :edad_gt', {edad_gt: query.usuario.edad_gt })
           // .andWhere('e.edad < :edad_lt', {edad_lt: query.usuario.edad_lt })
           .getMany();
    }

    async create(entity: Pregunta): Promise<Pregunta> {

        const insertResult = await this.repository.insert(entity);
        const created = this.findOneById(insertResult.identifiers[0].id);

        return await created;
    }

    async delete(id: any): Promise<Pregunta> {
        try {
            const entity = this.findOneById(id);
            await this.repository.remove(id);

            return await entity;
        } catch (e) {
            throw Error(e);
        }
    }

    async update(id: any, modified: Pregunta): Promise<Pregunta>{
        try {

            this.findOneById(id).then( async entity => {

                entity.texto = modified.texto;
                entity.respuesta_texto = modified.respuesta_texto;

                this.repository.save(entity).then( async e => {
                    return await e;
                });

            });

            return await null;

        } catch (e) {
            throw Error(e);
        }
    }
}