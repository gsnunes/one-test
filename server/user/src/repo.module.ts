import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ClientsModule, Transport } from '@nestjs/microservices';

import RepoService from './repo.service';
import User from './db/models/user.entity';
import Category from './db/models/category.entity';
import Message from './db/models/message.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, Message]),
    // ClientsModule.register([
    //   {
    //     name: 'HERO_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'my-app',
    //         brokers: [`${process.env.BROKER_HOST}:29092`],
    //       },
    //       consumer: {
    //         groupId: 'users-consumer',
    //       },
    //     },
    //   },
    // ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
