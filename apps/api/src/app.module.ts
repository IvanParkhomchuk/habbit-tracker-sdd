import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { HabitsModule } from './habits/habits.module.js';

@Module({
  imports: [PrismaModule, HabitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
