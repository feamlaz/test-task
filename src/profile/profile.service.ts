import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findMain() {
    return this.prisma.profile.findUnique({
      where: { slug: 'main' },
      include: { contacts: { orderBy: { position: 'asc' } } },
    });
  }
}