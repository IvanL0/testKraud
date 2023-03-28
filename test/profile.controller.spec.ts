import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/controllers/profile/profile.controller';
import { ProfileService } from '../src/services/profile/profile.service';
import { CreateProfileDto } from '../src/dtos/profile/Profile.dto';
import { Response } from 'express';

describe('AppController', () => {
  let profileController: ProfileController;
  // let profileService: ProfileService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    profileController = app.get<ProfileController>(ProfileController);
  });

  it('profileController should be defined', () => {
    expect(profileController).toBeDefined();
  });

  it('profileController should be defined', () => {
    const dto = new CreateProfileDto();
    const res = {} as Response;
    expect(profileController.registration(dto, res)).toHaveBeenCalled();
  });
});
