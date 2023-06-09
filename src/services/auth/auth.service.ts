import { Injectable } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.profileService.getByLogin(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
