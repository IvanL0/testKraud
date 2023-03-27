import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileService } from '../../services/profile/profile.service';
import {
  ProfileDto,
  UpdateProfileDto,
  createProfileSchema,
  CreateProfileDto,
} from '../../dtos/profile/Profile.dto';
import { Profile } from '../../entities/profile/profile.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../services/auth/jwt-auth.guard';
import { AuthService } from '../../services/auth/auth.service';

@ApiBearerAuth()
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Profile,
  })
  async findOne(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const id = req.params.id;
    const profileId = parseInt(id);
    const profile = await this.profileService.getOne(profileId);
    return res.status(200).send(profile);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const offset = req.query.offset as string;
    const limit = req.query.limit as string;
    const profiles = await this.profileService.getAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
    });
    return res.status(200).send(profiles);
  }

  @Post()
  @ApiOkResponse({ description: 'The newly created item', type: Profile })
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { error } = createProfileSchema.validate(createProfileDto);
    console.log('ERROR', error);
    if (error) {
      return res.status(422).send(error);
    }
    const profile = await this.profileService.create(createProfileDto);
    return res.status(201).send(profile);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
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
