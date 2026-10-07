import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { validateEnvironment } from './config/environment';
import { ExperienceModule } from './experience/experience.module';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      validate: validateEnvironment,
    }),
    PrismaModule,
    GraphqlModule,
    ProfileModule,
    ExperienceModule,
    SkillsModule,
    ProjectsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}