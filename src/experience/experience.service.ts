import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.experience.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        achievements: { orderBy: { position: 'asc' } },
        skills: { include: { skill: true } },
      },
    });
  }
}