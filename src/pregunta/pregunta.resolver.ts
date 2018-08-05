import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { find, filter } from 'lodash';
import {PreguntaService} from './pregunta.service';
import { Dependencies} from '@nestjs/common/utils/decorators/dependencies.decorator';

@Resolver('Pregunta')
@Dependencies(PreguntaService)
export class PreguntaResolver {

    private service: PreguntaService;

    constructor(service) {
        this.service = service;
    }

    @Query('preguntas')
    async index(obj, args, context, info) {
        return await this.service.findAll();
    }

    @Query('pregunta')
    async show(obj, args, context, info) {
        return await this.service.findOneById({ id: args.id });
    }

    @Mutation('createPregunta')
    async new(obj, args, context, info) {
        return await this.service.create(args);
    }

    @Mutation('deletePregunta')
    async delete(obj, args, context, info) {
        return await this.service.delete({ id: args.id });
    }

    @Mutation('updatePregunta')
    async update(obj, args, context, info) {
        return await this.service.update(args.id, args.entity);
    }

    @Query('searchPregunta')
    async search(obj, args, context, info) {
        return await this.service.search(args.query);
    }

}