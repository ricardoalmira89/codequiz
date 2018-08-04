import { Controller, Get } from '@nestjs/common';

import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

}