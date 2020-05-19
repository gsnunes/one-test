import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagePattern, Payload } from '@nestjs/microservices';

import RepoService from '../repo.service';
import User from '../db/models/user.entity';
import UserInput from './input/user.input';

@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getInitiativeUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async getInitiativeUser(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @MessagePattern('users.new.user')
  @Mutation(() => User)
  public async createInitiativeUser(
    @Payload() input: UserInput,
  ): Promise<User> {
    console.log('RECEIVED USER');
    let user = await this.repoService.userRepo.findOne({
      where: { email: input.email.toLowerCase().trim() },
    });

    if (!user) {
      user = this.repoService.userRepo.create({
        email: input.email.toLowerCase().trim(),
      });

      await this.repoService.userRepo.save(user);
    }

    return user;
  }
}
