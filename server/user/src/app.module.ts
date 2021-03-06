import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFederationModule } from '@nestjs/graphql';

import * as ormOptions from './config/orm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repo.module';
import UserResolver from './resolvers/user.resolver';
import CategoryResolver from './resolvers/category.resolver';
import MessageResolver from './resolvers/message.resolver';

const gqlImports = [UserResolver, CategoryResolver, MessageResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...gqlImports,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
