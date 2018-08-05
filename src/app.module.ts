// import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule} from '@nestjs/typeorm';
// // import { graphqlExpress } from 'apollo-server-express';
// import { GraphQLModule } from '@nestjs/graphql';
// import {UsuarioModule} from './usuario/usuario.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express/dist/expressApollo';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';

import {QuizModule} from './quiz/quiz.module';
import {UsuarioModule} from './usuario/usuario.module';

@Module({
  imports: [ TypeOrmModule.forRoot() , GraphQLModule, UsuarioModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
    constructor(private readonly graphQLFactory: GraphQLFactory) {}

    configure(consumer: MiddlewareConsumer) {
        const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
        const schema = this.graphQLFactory.createSchema({ typeDefs });

        consumer
            .apply(graphqlExpress(req => ({ schema, rootValue: req })))
            .forRoutes('/graphql');
    }
}