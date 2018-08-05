import { Injectable} from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';

import { Usuario } from './usuario.entity';
import { Param } from '@nestjs/common/utils/decorators/route-params.decorator';
import {Like} from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>) {}

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findOneById(@Param('id') id): Promise<Usuario> {
        return await this.usuarioRepository.findOneOrFail(id);
    }

    async search(query: any): Promise<Usuario[]>{

        return await this.usuarioRepository
           .createQueryBuilder('e')
           .where('e.email = :email', {email: query.usuario.email})
           .orWhere('e.nombre LIKE :nombre', {nombre: '%' + query.usuario.nombre + '%'})
           .orWhere('e.edad > :edad_gt', {edad_gt: query.usuario.edad_gt })
           .andWhere('e.edad < :edad_lt', {edad_lt: query.usuario.edad_lt })
           .getMany();
    }

    async create(entity: Usuario): Promise<Usuario> {

        const insertResult = await this.usuarioRepository.insert(entity);
        const created = this.findOneById(insertResult.identifiers[0].id);

        return await created;
    }

    async delete(id: any): Promise<Usuario> {
        try {
            const entity = this.findOneById(id);
            await this.usuarioRepository.remove(id);

            return await entity;
        } catch (e) {
            throw Error(e);
        }
    }

    async update(id: any, usuario: Usuario): Promise<Usuario>{
        try {

            this.findOneById(id).then( async entity => {

                entity.nombre = usuario.nombre;
                entity.email = usuario.email;
                entity.edad = usuario.edad;
                entity.email = usuario.email;

                this.usuarioRepository.save(entity).then( async u => {
                    return await u;
                });

            });


            return await usuario;

        } catch (e) {
            throw Error(e);
        }
    }
}