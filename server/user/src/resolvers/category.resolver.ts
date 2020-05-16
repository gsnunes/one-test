import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import RepoService from '../repo.service';
import Category from '../db/models/category.entity';
import CategoryInput from './input/category.input';

@Resolver(() => Category)
export default class CategoryResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Category])
  public async getCategories(): Promise<Category[]> {
    return this.repoService.categoryRepo.find();
  }

  @Query(() => Category, { nullable: true })
  public async getCategory(@Args('id') id: number): Promise<Category> {
    return this.repoService.categoryRepo.findOne(id);
  }

  @Mutation(() => Category)
  public async createCategory(
    @Args('data') input: CategoryInput,
  ): Promise<Category> {
    const category = this.repoService.categoryRepo.create({
      name: input.name,
      description: input.description,
    });

    await this.repoService.categoryRepo.save(category);

    return category;
  }
}
