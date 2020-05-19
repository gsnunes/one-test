import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';

import User from './db/models/user.entity';
import Category from './db/models/category.entity';
import Message from './db/models/message.entity';

@Injectable()
class RepoService implements OnModuleInit {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Message) public readonly messageRepo: Repository<Message>,
    @InjectRepository(Category)
    public readonly categoryRepo: Repository<Category>,
    @Inject('HERO_SERVICE') public readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('users.new.user');
    await this.client.connect();
  }
}

export default RepoService;
