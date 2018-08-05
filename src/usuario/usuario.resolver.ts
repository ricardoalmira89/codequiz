import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { find, filter } from 'lodash';
import {UsuarioService} from './usuario.service';
import { Dependencies} from '@nestjs/common/utils/decorators/dependencies.decorator';

@Resolver('Usuario')
@Dependencies(UsuarioService)
export class UsuarioResolver {

    private usuarioService : UsuarioService;

    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Query('usuarios')
    async index(obj, args, context, info) {
        return await this.usuarioService.findAll();
    }

    @Query('usuario')
    async show(obj, args, context, info) {
        return await this.usuarioService.findOneById({ id: args.id });
    }

    @Mutation('createUsuario')
    async new(obj, args, context, info) {
        return await this.usuarioService.create(args);
    }

    @Mutation('deleteUsuario')
    async delete(obj, args, context, info) {
        return await this.usuarioService.delete({ id: args.id });
    }

    @Mutation('updateUsuario')
    async update(obj, args, context, info) {
        // return await this.usuarioService.
    }
}