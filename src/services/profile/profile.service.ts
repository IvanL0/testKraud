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

  async getByLogin(login: string): Promise<Profile | null> {
    let profile = await this.profileRepository.findOne<Profile>({
      where: { login: login },
    });
    profile = JSON.parse(JSON.stringify(profile));
    return profile;
  }

  async getOne(id: number): Promise<Profile | null> {
    const profile = await this.profileRepository.findOne<Profile>({
      where: { id: id },
    });
    return profile;
  }

  async getAll(params: { offset: number; limit: number }): Promise<Profile[]> {
    const profiles = await this.profileRepository.findAll({
      offset: (params.offset - 1) * params.limit,
      limit: params.limit,
    });
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

  async delete(id: number): Promise<any> {
    await this.profileRepository.destroy({
      where: { id: id },
    });
    return true;
  }
}
