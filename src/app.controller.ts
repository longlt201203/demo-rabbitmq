import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { QueueService } from './queue/queue.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly queueService: QueueService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("test-queue")
  async testQueue(@Body() body: { queue: string, message: string }) {
    const { queue, message } = body;
    await this.queueService.sendMessage(queue, message);
    return "ok";
  }
}
