import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.skill.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  }
}