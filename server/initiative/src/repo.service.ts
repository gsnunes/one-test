import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Initiative from './db/models/initiative.entity';
import User from './db/models/user.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(Initiative)
    public readonly initiativeRepo: Repository<Initiative>,
    @InjectRepository(User)
    public readonly userRepo: Repository<User>,
  ) {}
}

export default RepoService;
