import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/controllers/profile/profile.controller';
import { ProfileService } from '../src/services/profile/profile.service';
import * as response from 'supertest';

describe('AppController', () => {
  let profileController: ProfileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    profileController = app.get<ProfileController>(ProfileController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        profileController.create(
          { login: 'ion', password: '123', email: 'aaa' },
          response,
        ),
      ).toBe({
        login: 'ion',
      });
    });
  });
});
