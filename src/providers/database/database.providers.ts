import { Sequelize } from 'sequelize-typescript';
import { Profile } from '../../entities/profile/profile.entity';

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
      sequelize.addModels([Profile]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
