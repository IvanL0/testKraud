import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CitiesService } from '../../services/cities/cities.service';
import { citiesProviders } from '../../providers/cities/cities.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...citiesProviders, CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
