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
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileService } from '../../services/profile/profile.service';
import {
  UpdateProfileDto,
  createProfileSchema,
  updateProfileSchema,
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
  @ApiOkResponse({ description: 'The newly created item', type: Profile })
  async findAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const offset = req.query.offset || '1';
    const limit = req.query.limit || '10';
    const profiles = await this.profileService.getAll({
      offset: parseInt(offset as string),
      limit: parseInt(limit as string),
    });
    return res.status(200).send(profiles);
  }

  @Post()
  @ApiOkResponse({ description: 'The newly created item', type: Profile })
  async registration(
    @Body() createProfileDto: CreateProfileDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { error } = createProfileSchema.validate(createProfileDto);
    if (error) {
      return res.status(422).send(error);
    }
    const checkEmail = await this.profileService.isEmailAlreadyUsed(
      createProfileDto.email,
    );
    if (checkEmail) {
      return res.status(400).send({ message: 'Email already in use' });
    }
    const profile = await this.profileService.create(createProfileDto);
    return res.status(201).send(profile);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(@Req() req: Request) {
    const user = await this.profileService.getByLogin(req.body.username);
    const token = await this.authService.login(req.user);
    const result = {
      ...user,
      accessToken: token.access_token,
    };
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfile: UpdateProfileDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { error } = updateProfileSchema.validate(UpdateProfileDto);
    if (error) {
      return res.status(422).send(error);
    }
    const profileId = parseInt(id);
    const profile = await this.profileService.update(profileId, updateProfile);
    return res.status(201).send(profile);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const profileId = parseInt(id);
    this.profileService.delete(profileId);
    return res.status(204);
  }
}
