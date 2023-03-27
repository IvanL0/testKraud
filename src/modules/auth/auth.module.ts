import { Module } from '@nestjs/common';
import { ProfileModule } from '../profile/profile.module';
import { AuthService } from '../../services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../services/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../services/auth/jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ProfileModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
