import { Profile } from '../../entities/profile/profile.entity';

export const profileProviders = [
  {
    provide: 'PROFILE_REPOSITORY',
    useValue: Profile,
  },
];
