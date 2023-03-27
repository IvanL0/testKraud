import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from '../../services/cities/cities.service';
import { Cities } from '../../entities/cities/cities.entity';

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
