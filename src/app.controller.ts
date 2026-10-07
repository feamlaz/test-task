import { Controller, Get } from '@nestjs/common';

export interface HealthStatus {
  status: 'ok';
  uptimeSeconds: number;
  timestamp: string;
}

@Controller('health')
export class AppController {
  @Get()
  status(): HealthStatus {
    return {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}