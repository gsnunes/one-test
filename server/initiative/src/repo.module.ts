import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import RepoService from './repo.service';
import Initiative from './db/models/initiative.entity';
import User from './db/models/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Initiative, User]),
    ClientsModule.register([
      {
        name: 'HERO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: [`${process.env.BROKER_HOST}:29092`],
          },
          consumer: {
            groupId: 'users-consumer'
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        }
      },
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
