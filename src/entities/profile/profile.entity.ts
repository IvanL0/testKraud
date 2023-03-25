import { Cities } from '../cities/cities.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Unique,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

@Table
export class Profile extends Model<Profile> {
  @PrimaryKey
  @Unique
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @Unique
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    onDelete: 'restrict',
  })
  birthDate: string;

  @ForeignKey(() => Cities)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    onDelete: 'restrict',
  })
  cityId: string;

  @BelongsTo(() => Cities)
  city: Cities;
}
