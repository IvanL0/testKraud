import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { CitiesModule } from './modules/cities/cities.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    AuthModule,
    CitiesModule,
  ],
})
export class AppModule {}
