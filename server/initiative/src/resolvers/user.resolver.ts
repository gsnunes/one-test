import { OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Payload } from '@nestjs/microservices';
import { Kafka, EachMessagePayload } from 'kafkajs';

import RepoService from '../repo.service';
import User from '../db/models/user.entity';
import UserInput, { DeleteUserInput } from './input/user.input';

@Resolver(() => User)
export default class UserResolver implements OnModuleInit {
  constructor(private readonly repoService: RepoService) {}

  private kafka: Kafka;

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'server-user',
      brokers: [`${process.env.BROKER_HOST}:29092`]
    })

    const consumer = this.kafka.consumer({ groupId: 'user-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'user', fromBeginning: true })

    await consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        if (payload.message.key.toString() === 'user-create') {
          await this.createInitiativeUser(JSON.parse(payload.message.value.toString()));
        } else if (payload.message.key.toString() === 'user-delete') {
          await this.deleteInitiativeUser(JSON.parse(payload.message.value.toString()));
        }
      },
    })
  }

  @Query(() => [User])
  public async getInitiativeUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async getInitiativeUser(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createInitiativeUser(
    @Payload() input: UserInput,
  ): Promise<User> {
    let user = await this.repoService.userRepo.findOne({
      where: { email: input.email.toLowerCase().trim() },
    });

    if (!user) {
      user = this.repoService.userRepo.create({
        email: input.email.toLowerCase().trim(),
        firstName: input.firstName.toLowerCase().trim(),
        lastName: input.lastName.toLowerCase().trim(),
      });

      await this.repoService.userRepo.save(user);
    }

    return user;
  }

  @Mutation(() => User)
  public async deleteInitiativeUser(@Args('data') input: DeleteUserInput): Promise<User> {
    const user = await this.repoService.userRepo.findOne(input.id);

    if (!user) throw new Error('User does not exists');

    const copy = { ...user };

    await this.repoService.userRepo.remove(user);

    return copy;
  }
}
