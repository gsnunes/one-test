import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoService from './repo.service';
import User from './db/models/user.entity';
import Category from './db/models/category.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
