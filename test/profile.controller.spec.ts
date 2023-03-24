import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/controllers/app.controller';
import { ProfileController } from '../src/controllers/profile/profile.controller';
import { ProfileService } from '../src/services/profile/profile.service';

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
      expect(profileController.findAll()).toBe({ login: 'ion' });
    });
  });
});
