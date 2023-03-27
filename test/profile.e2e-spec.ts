import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProfileController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /profile', () => {
    return request(app.getHttpServer()).get('/profile').expect(200);
  });

  it('GET /profile/1', () => {
    return request(app.getHttpServer()).get('/profile/1').expect(401);
  });

  it('POST /profile', () => {
    return request(app.getHttpServer()).post('/profile').expect(422);
  });

  it('PATCH /profile/1', () => {
    return request(app.getHttpServer()).post('/profile').expect(422);
  });
});
