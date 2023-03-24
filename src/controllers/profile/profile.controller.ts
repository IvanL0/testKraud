import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ProfileService } from '../../services/profile/profile.service';
import { JoiValidationPipe } from '../../pipes/joi.pipe';
import { ProfileDto, UpdateProfileDto } from '../../dtos/profile/Profile.dto';
import { Profile } from '../../entities/profile/profile.entity';
import {
  createProfileSchema,
  CreateProfileDto,
} from '../../dtos/profile/Profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Profile | null> {
    const profileId = parseInt(id);
    const profile = await this.profileService.getOne(profileId);
    return profile;
  }

  @Get()
  async findAll(@Query() query: any): Promise<Profile[]> {
    const profiles = await this.profileService.getAll(query);
    return profiles;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createProfileSchema))
  async create(@Body() createProfile: CreateProfileDto): Promise<ProfileDto> {
    console.log('CREATE_PROFILE', createProfile);
    const profile = await this.profileService.create(createProfile);
    return profile;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfile: UpdateProfileDto,
  ): Promise<ProfileDto> {
    console.log('UPDATE_PROFILE', updateProfile);
    const profileId = parseInt(id);
    const profile = await this.profileService.update(profileId, updateProfile);
    return profile;
  }
}
