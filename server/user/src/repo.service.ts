import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import User from './db/models/user.entity';
import Category from './db/models/category.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Category)
    public readonly categoryRepo: Repository<Category>,
  ) {}
}

export default RepoService;
