import { Injectable} from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';

import { Usuario } from './usuario.entity';
import { Param } from '@nestjs/common/utils/decorators/route-params.decorator';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly repository: Repository<Usuario>) {}

    async findAll(): Promise<Usuario[]> {
        return await this.repository.find();
    }

    async findOneById(@Param('id') id): Promise<Usuario> {
        return await this.repository.findOneOrFail(id);
    }

    async search(query: any): Promise<Usuario[]>{

        return await this.repository
           .createQueryBuilder('e')
           .where('e.email = :email', {email: query.usuario.email})
           .orWhere('e.nombre LIKE :nombre', {nombre: '%' + query.usuario.nombre + '%'})
           .orWhere('e.edad > :edad_gt', {edad_gt: query.usuario.edad_gt })
           .andWhere('e.edad < :edad_lt', {edad_lt: query.usuario.edad_lt })
           .getMany();
    }

    async create(entity: Usuario): Promise<Usuario> {

        const insertResult = await this.repository.insert(entity);
        const created = this.findOneById(insertResult.identifiers[0].id);

        return await created;
    }

    async delete(id: any): Promise<Usuario> {
        try {
            const entity = this.findOneById(id);
            await this.repository.remove(id);

            return await entity;
        } catch (e) {
            throw Error(e);
        }
    }

    async update(id: any, modified: Usuario): Promise<Usuario>{
        try {

            this.findOneById(id).then( async entity => {

                entity.nombre = modified.nombre;
                entity.email = modified.email;
                entity.edad = modified.edad;
                entity.email = modified.email;

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