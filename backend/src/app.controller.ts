import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('predict')
  predictSalary(@Body('experience') exp: number) {
    const salary = this.appService.getPrediction(exp);
    return { predicted_salary: salary };
  }
}