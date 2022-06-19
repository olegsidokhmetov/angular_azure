import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClickEntry } from '@pipeline-example/util/clicker-entities';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  getData() {
    return this.appService.getData();
  }

  @Post('click')
  addData(@Body() click: ClickEntry) {
    this.appService.addData(click);
  }

  @Post('clear')
  clearData() {
    this.appService.deleteData();
  }
}
