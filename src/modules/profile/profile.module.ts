import { Module } from '@nestjs/common';
import { profileProviders } from '../../providers/profile/profile.providers';
import { ProfileService } from '../../services/profile/profile.service';
import { ProfileController } from '../../controllers/profile/profile.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...profileProviders, ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
