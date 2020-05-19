import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka-options.interface';

import RepoService from '../repo.service';
import User from '../db/models/user.entity';
import UserInput from './input/user.input';

@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

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
      });

      await this.repoService.userRepo.save(user);
    }

    console.log('ADD USER');
    this.repoService.client.send('users.new.user', user);

    return user;
  }

  @MessagePattern('users.new.user')
  sendWorld(@Payload() data: KafkaMessage): string {
    console.log('SHOW USER');
    return `${data.value} world!`;
  }
}
