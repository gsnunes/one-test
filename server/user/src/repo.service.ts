import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import User from './db/models/user.entity';
import Category from './db/models/category.entity';
import Message from './db/models/message.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Message) public readonly messageRepo: Repository<Message>,
    @InjectRepository(Category)
    public readonly categoryRepo: Repository<Category>,
  ) {}
}

export default RepoService;
