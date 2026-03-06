import { IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Frequency } from '../../../generated/prisma/enums.js';

export class CreateHabitDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Frequency)
  frequency: Frequency;

  @IsInt()
  @Min(1)
  @IsOptional()
  targetValue?: number;
}
