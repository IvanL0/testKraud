import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../modules/database/database.module';
import { CitiesModule } from '../modules/cities/cities.module';
import { Seeder } from './seeder';

@Module({
  imports: [DatabaseModule, CitiesModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
