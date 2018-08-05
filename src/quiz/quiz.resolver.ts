import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { find, filter } from 'lodash';
import {QuizService} from './quiz.service';
import { Dependencies} from '@nestjs/common/utils/decorators/dependencies.decorator';

@Resolver('Usuario')
@Dependencies(QuizService)
export class QuizResolver {

    private service: QuizService;

    constructor(service) {
        this.service = service;
    }

    @Query('quizzes')
    async index(obj, args, context, info) {
        return await this.service.findAll();
    }

    @Query('quiz')
    async show(obj, args, context, info) {
        return await this.service.findOneById({ id: args.id });
    }

    @Mutation('createQuiz')
    async new(obj, args, context, info) {
        return await this.service.create(args);
    }

    @Mutation('deleteQuiz')
    async delete(obj, args, context, info) {
        return await this.service.delete({ id: args.id });
    }

    @Mutation('updateQuiz')
    async update(obj, args, context, info) {
        return await this.service.update(args.id, args.quiz);
    }

// ------------------------------------------

    @Query('searchQuiz')
    async search(obj, args, context, info) {
        return await this.service.search({quiz : args.quiz});
    }

}