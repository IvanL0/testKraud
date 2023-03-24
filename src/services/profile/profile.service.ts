import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProfileDto,
  UpdateProfileDto,
} from '../../dtos/profile/Profile.dto';
import { Profile } from '../../entities/profile/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PROFILE_REPOSITORY')
    private readonly profileRepository: typeof Profile,
  ) {}

  async getOne(id: number): Promise<Profile | null> {
    const profile = await this.profileRepository.findOne<Profile>({
      where: { id: id },
    });
    return profile;
  }

  async getAll(): Promise<Profile[]> {
    const profiles = await this.profileRepository.findAll();
    return profiles;
  }

  create(profileCreate: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(profileCreate as Profile);
    return profile;
  }

  async update(id: number, profileUpdate: UpdateProfileDto): Promise<any> {
    const profile = await this.profileRepository.update(profileUpdate, {
      where: { id: id },
    });
    return profile;
  }
}
