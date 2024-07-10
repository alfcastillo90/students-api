import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Redirect('/dev/api', 301)
  root() {
    return;
  }
}
