import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './projects.service';

@Module({
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectsModule {}