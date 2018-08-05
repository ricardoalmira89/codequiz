import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuario } from './usuario.entity';
import {UsuarioService} from './usuario.service';
import {UsuarioController} from './usuario.controller';
import { addResolveFunctionsToSchema } from 'graphql-tools';
import {UsuarioResolver} from './usuario.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService, UsuarioResolver],
    controllers: [UsuarioController],
})
export class UsuarioModule {


}