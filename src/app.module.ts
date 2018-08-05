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
import {UsuarioModule} from './usuario/usuario.module';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';

import { graphqlExpress } from 'apollo-server-express/dist/expressApollo';


@Module({
  imports: [ TypeOrmModule.forRoot() , GraphQLModule, UsuarioModule],
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