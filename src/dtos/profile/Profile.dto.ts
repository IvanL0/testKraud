import * as Joi from 'joi';

export const createProfileSchema = Joi.object({
  login: Joi.string().min(3).max(10).required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(15).required(),
});

export const updateProfileSchema = Joi.object({
  login: Joi.string().min(3).max(10).required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(15).required(),
  birthDate: Joi.string().required(),
  cityId: Joi.number().required(),
});

export interface ProfileDto {
  login: string;
  email: string;
  password: string;
  birthDate?: string;
}

export interface CreateProfileDto {
  login: string;
  email: string;
  password: string;
}

export interface UpdateProfileDto {
  login: string;
  email: string;
  password: string;
  birthDate: string;
  cityId: number;
}
