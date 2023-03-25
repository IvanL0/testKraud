import { Sequelize } from 'sequelize-typescript';
import { Profile } from '../../entities/profile/profile.entity';
import { Cities } from '../../entities/cities/cities.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'testuser',
        password: '123123',
        database: 'test_kraud',
      });
      sequelize.addModels([Profile, Cities]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
