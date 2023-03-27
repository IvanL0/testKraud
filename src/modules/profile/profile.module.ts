import { Module } from '@nestjs/common';
import { profileProviders } from '../../providers/profile/profile.providers';
import { ProfileService } from '../../services/profile/profile.service';
import { ProfileController } from '../../controllers/profile/profile.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  providers: [...profileProviders, ProfileService, AuthService, JwtService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
