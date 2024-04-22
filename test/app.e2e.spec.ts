import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@main/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('/api');
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/movies', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      '/api/v1/movies',
    );

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        min: expect.arrayContaining([
          expect.objectContaining({
            producer: 'Bo Derek',
            interval: 6,
            previousWin: 1984,
            followingWin: 1990,
          }),
        ]),
        max: expect.arrayContaining([
          expect.objectContaining({
            producer: 'Bo Derek',
            interval: 6,
            previousWin: 1984,
            followingWin: 1990,
          }),
        ]),
      }),
    );
  });
});
