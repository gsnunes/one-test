import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import RepoService from './repo.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly repoService: RepoService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  async getHello(): Promise<string> {
    return `There are ${await this.repoService.userRepo.count()} existent users`;
  }
}
