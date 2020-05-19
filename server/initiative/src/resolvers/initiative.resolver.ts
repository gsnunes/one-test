import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import RepoService from '../repo.service';
import Initiative from '../db/models/initiative.entity';
import InitiativeInput from './input/initiative.input';

@Resolver(() => Initiative)
export default class InitiatieResolver {
  constructor(private readonly repoService: RepoService) {}

  onModuleInit() {
    this.repoService.client.subscribeToResponseOf('math.sum');
    this.repoService.client.connect();
  }

  @Query(() => [Initiative])
  public async getInitiatives(): Promise<Initiative[]> {
    return this.repoService.initiativeRepo.find();
  }

  @Query(() => Initiative, { nullable: true })
  public async getInitiative(@Args('id') id: number): Promise<Initiative> {
    return this.repoService.initiativeRepo.findOne(id);
  }

  @Mutation(() => Initiative)
  public async createInitiative(
    @Args('data') input: InitiativeInput,
  ): Promise<Initiative> {
    const initiative = this.repoService.initiativeRepo.create({
      name: input.name,
      description: input.description,
    });

    await this.repoService.initiativeRepo.save(initiative);

    return await this.repoService.client.send('math.sum', {
      numbers: [1, 2, 3, 4, 5],
    }).toPromise();
  }
}
