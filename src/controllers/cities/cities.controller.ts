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
import { JoiValidationPipe } from '../../pipes/joi.pipe';
import { CitiesService } from '../../services/cities/cities.service';
import { Cities } from '../../entities/cities/cities.entity';
import { CreateCityDto } from '../../../dist/dtos/cities/Cities.dto';
import { createCitySchema } from '../../dtos/cities/Cities.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async findAll(@Query() query: any): Promise<Cities[]> {
    const cities = await this.citiesService.getAll(query);
    return cities;
  }

  // @Post()
  // @UsePipes(new JoiValidationPipe(createCitySchema))
  // async create(@Body() createProfile: CreateCityDto): Promise<Cities> {
  //   console.log('CREATE_PROFILE', createProfile);
  //   const profile = await this.citiesService.create(createProfile as Cities);
  //   return profile;
  // }
}
