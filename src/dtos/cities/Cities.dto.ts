import * as Joi from 'joi';

export const createCitySchema = Joi.object({
  login: Joi.string().min(3).max(10).required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(15).required(),
});

export const updateCitySchema = Joi.object({
  login: Joi.string().min(3).max(10).required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(15).required(),
  birthDate: Joi.string().required(),
  cityId: Joi.number().required(),
});

export interface CityDto {
  id: string;
  name: string;
}

export interface CreateCityDto {
  name: string;
}

export interface UpdateCityDto {
  name: string;
}
