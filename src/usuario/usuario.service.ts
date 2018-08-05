import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {InsertResult, Repository} from 'typeorm';

import { Usuario } from './usuario.entity';
import { Param } from '@nestjs/common/utils/decorators/route-params.decorator';
import {error} from 'util';

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

    async create(usuario: Usuario): Promise<Usuario> {

        const insertResult = await this.usuarioRepository.insert(usuario);
        const created = this.findOneById(insertResult.identifiers[0].id);

        return await created;
    }

    async delete(id: number): Promise<Usuario> {
        try {
            const usuario = this.findOneById(id);
            await this.usuarioRepository.remove(id);

            return await usuario;
        } catch (e) {
            throw Error(e);
        }
    }
}