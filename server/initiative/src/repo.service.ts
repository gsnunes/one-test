import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';

import Initiative from './db/models/initiative.entity';
import User from './db/models/user.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Initiative)
    public readonly initiativeRepo: Repository<Initiative>,
    @InjectRepository(User)
    public readonly userRepo: Repository<User>,
    @Inject('HERO_SERVICE') public readonly client: ClientKafka,
  ) {}
}

export default RepoService;
