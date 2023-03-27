import { Inject, Injectable } from '@nestjs/common';
import { Cities } from '../../entities/cities/cities.entity';
import { UpdateCityDto } from '../../dtos/cities/Cities.dto';
import { cities } from '../../seed/cities/data';
import { CreateCityDto } from '../../dtos/cities/Cities.dto';

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

  async getAll(params: { offset: number; limit: number }): Promise<Cities[]> {
    const cities = await this.citiesRepository.findAll({
      offset: (params.offset - 1) * params.limit,
      limit: params.limit,
    });
    return cities;
  }

  createBySeed(): Array<Promise<Cities | null>> {
    return cities.map(async (city: CreateCityDto) => {
      return await this.citiesRepository
        .findOne({ where: { name: city.name } })
        .then(async (dbCity) => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbCity) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.citiesRepository.create(city as Cities),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }

  async delete(id: number): Promise<any> {
    const city = await this.citiesRepository.destroy({
      where: { id: id },
    });
    return city;
  }
}
