import { Sequelize } from 'sequelize-typescript';
import { Profile } from '../../entities/profile/profile.entity';
import { Cities } from '../../entities/cities/cities.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        port: 5432,
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
      });
      sequelize.addModels([Profile, Cities]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
