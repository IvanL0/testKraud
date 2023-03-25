import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CitiesService } from '../../services/cities/cities.service';
import { citiesProviders } from '../../providers/cities/cities.provider';
import { CitiesController } from '../../controllers/cities/cities.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...citiesProviders, CitiesService],
  controllers: [CitiesController],
  exports: [CitiesService],
})
export class CitiesModule {}
