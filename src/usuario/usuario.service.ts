import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {InsertResult, Repository} from 'typeorm';

import { Usuario } from './usuario.entity';
import { Param } from '@nestjs/common/utils/decorators/route-params.decorator';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>) {}

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async findOneById(@Param('id') id): Promise<Usuario> {
        return await this.usuarioRepository.findOne(id);
    }

    async create(usuario: Usuario): Promise<InsertResult> {
        return await this.usuarioRepository.insert(usuario);
    }
}