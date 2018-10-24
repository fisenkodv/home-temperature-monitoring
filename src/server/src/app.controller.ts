import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('dashboard')
  @Get('about')
  root(@Res() res) {
    res.sendFile('index.html');
  }
}
