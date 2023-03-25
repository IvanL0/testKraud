import { Injectable, Logger } from '@nestjs/common';
import { CitiesService } from '../services/cities/cities.service';
@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly citiesSeederService: CitiesService,
  ) {}
  async seed() {
    await this.city()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async city() {
    return await Promise.all(this.citiesSeederService.createBySeed())
      .then((createdCity) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of languages created : ' +
            // Remove all null values and return only created languages.
            createdCity.filter(
              (nullValueOrCreatedCity) => nullValueOrCreatedCity,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
