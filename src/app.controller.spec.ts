import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  it('reports ok', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    const response = moduleRef.get(AppController).status();

    expect(response.status).toBe('ok');
    expect(response.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });
});