import { Controller, Get, Redirect, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/user")
  getusers() {
    return this.appService.getUser()
  }

}
