import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(onlyFeatured = false) {
    return this.prisma.project.findMany({
      where: onlyFeatured ? { featured: true } : undefined,
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      include: { skills: { include: { skill: true } } },
    });
  }
}