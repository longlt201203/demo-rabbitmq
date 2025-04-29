import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from "amqplib";

@Injectable()
export class QueueService implements OnModuleInit {
    private connection: amqp.ChannelModel;

    async onModuleInit() {
        this.connection = await this.initQueue()
    }

    private async initQueue() {
        return await amqp.connect({
            hostname: process.env.RABBITMQ_HOST ?? "localhost",
            port: parseInt(process.env.RABBITMQ_PORT ?? "5672"),
            username: process.env.RABBITMQ_DEFAULT_USER ?? "guest",
            password: process.env.RABBITMQ_DEFAULT_PASS ?? "guest",
        });
    }

    async sendMessage(queue: string, message: string) {
        const channel = await this.connection.createChannel()
        return channel.sendToQueue(queue, Buffer.from(message));
    }
}
