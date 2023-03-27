import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export const createProfileSchema = Joi.object({
  login: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
}).options({ abortEarly: false });

export const updateProfileSchema = Joi.object({
  login: Joi.string().min(3).max(10).optional(),
  email: Joi.string().optional(),
  password: Joi.string().min(8).max(15).optional(),
  birthDate: Joi.string().required(),
  cityId: Joi.number().optional(),
}).options({ abortEarly: false });

export class ProfileDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  birthDate?: string;
}

export class CreateProfileDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UpdateProfileDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  birthDate?: string;

  @ApiProperty()
  cityId: number;
}
export interface ProfileAttributes {
  login: string;
  email: string;
  password: string;
  birthDate?: string;
}

export interface CreateProfileAttributes {
  login: string;
  email: string;
  password: string;
}

export interface UpdateProfileAttributes {
  login: string;
  email: string;
  password: string;
  birthDate: string;
  cityId: number;
}
