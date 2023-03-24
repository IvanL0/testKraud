import * as Joi from 'joi';

export const createCitySchema = Joi.object({
  name: Joi.string().required(),
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
