import { Inject, Injectable } from '@nestjs/common';
import { Cities } from '../../entities/cities/cities.entity';
import { UpdateCityDto } from '../../dtos/cities/Cities.dto';

@Injectable()
export class CitiesService {
  constructor(
    @Inject('CITIES_REPOSITORY')
    private readonly citiesRepository: typeof Cities,
  ) {}

  async getOne(id: number): Promise<Cities | null> {
    const city = await this.citiesRepository.findOne<Cities>({
      where: { id: id },
    });
    return city;
  }

  async getAll(): Promise<Cities[]> {
    const cities = await this.citiesRepository.findAll();
    return cities;
  }

  create(cityCreate: any): Promise<Cities> {
    const city = this.citiesRepository.create<Cities>(cityCreate);
    return city;
  }

  async update(id: number, cityUpdate: UpdateCityDto): Promise<any> {
    const city = await this.citiesRepository.update(cityUpdate, {
      where: { id: id },
    });
    return city;
  }
}
