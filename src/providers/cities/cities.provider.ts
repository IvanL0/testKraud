import { Cities } from '../../entities/cities/cities.entity';

export const citiesProviders = [
  {
    provide: 'CITIES_REPOSITORY',
    useValue: Cities,
  },
];
