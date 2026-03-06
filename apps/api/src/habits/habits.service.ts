import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateHabitDto } from './dto/create-habit.dto.js';
import { UpdateHabitDto } from './dto/update-habit.dto.js';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateHabitDto) {
    return this.prisma.habit.create({
      data: {
        title: dto.title,
        description: dto.description,
        frequency: dto.frequency,
        targetValue: dto.targetValue ?? 1,
      },
    });
  }

  findAll() {
    return this.prisma.habit.findMany();
  }

  async findOne(id: string) {
    const habit = await this.prisma.habit.findUnique({ where: { id } });
    if (!habit) throw new NotFoundException(`Habit ${id} not found`);
    return habit;
  }

  async update(id: string, dto: UpdateHabitDto) {
    await this.findOne(id);
    return this.prisma.habit.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.habit.delete({ where: { id } });
  }
}
