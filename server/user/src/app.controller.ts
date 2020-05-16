import { Controller, Get } from '@nestjs/common';
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
    return `Users: ${await this.repoService.userRepo.count()};<br> Categories: ${await this.repoService.categoryRepo.count()}`;
  }
}
