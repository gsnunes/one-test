import { OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Kafka } from 'kafkajs';

import RepoService from '../repo.service';
import User from '../db/models/user.entity';
import UserInput, { DeleteUserInput } from './input/user.input';

@Resolver(() => User)
export default class UserResolver implements OnModuleInit {
  constructor(private readonly repoService: RepoService) {}

  private kafka: Kafka;

  onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'server-user',
      brokers: [`${process.env.BROKER_HOST}:29092`],
    });
  }

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createOrLoginUser(
    @Args('data') input: UserInput,
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

    try {
      const producer = this.kafka.producer();

      await producer.connect();
      await producer.send({
        topic: 'user',
        messages: [{ key: 'user-create', value: JSON.stringify(input) }],
      });

      await producer.disconnect();
    } catch (error) {
      console.log(error);
    }

    return user;
  }

  @Mutation(() => User)
  public async deleteUser(@Args('data') input: DeleteUserInput): Promise<User> {
    const user = await this.repoService.userRepo.findOne(input.id);

    if (!user) throw new Error('User does not exists');

    const copy = { ...user };

    await this.repoService.userRepo.remove(user);

    try {
      const producer = this.kafka.producer();

      await producer.connect();
      await producer.send({
        topic: 'user',
        messages: [{ key: 'user-delete', value: JSON.stringify(input) }],
      });

      await producer.disconnect();
    } catch (error) {
      console.log(error);
    }

    return copy;
  }
}
