import { Controller, Get } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { Query , Resolver} from '@nestjs/graphql';

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

}