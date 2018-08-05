import { Injectable} from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';

import { Quiz } from './quiz.entity';
import { Param } from '@nestjs/common/utils/decorators/route-params.decorator';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly repository: Repository<Quiz>) {}

    async findAll(): Promise<Quiz[]> {
        return await this.repository.find();
    }

    async findOneById(@Param('id') id): Promise<Quiz> {
        return await this.repository.findOneOrFail(id);
    }

    async search(query: any): Promise<Quiz[]>{

        return await this.repository
           .createQueryBuilder('e')
           // .where('e.email = :email', {email: query.usuario.email})
           .orWhere('e.titulo LIKE :titulo', {titulo: '%' + query.titulo + '%'})
           // .orWhere('e.edad > :edad_gt', {edad_gt: query.usuario.edad_gt })
           // .andWhere('e.edad < :edad_lt', {edad_lt: query.usuario.edad_lt })
           .getMany();
    }

    async create(entity: Quiz): Promise<Quiz> {

        const insertResult = await this.repository.insert(entity);
        const created = this.findOneById(insertResult.identifiers[0].id);

        return await created;
    }

    async delete(id: any): Promise<Quiz> {
        try {
            const entity = this.findOneById(id);
            await this.repository.remove(id);

            return await entity;
        } catch (e) {
            throw Error(e);
        }
    }

    async update(id: any, modified: Quiz): Promise<Quiz>{
        try {

            this.findOneById(id).then( async entity => {

                entity.titulo = modified.titulo;
                entity.descripcion = modified.descripcion;

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