import { Module } from '@nestjs/common';
import { SkillResolver } from './skill.resolver';
import { SkillService } from './skills.service';

@Module({
  providers: [SkillService, SkillResolver],
  exports: [SkillService],
})
export class SkillsModule {}