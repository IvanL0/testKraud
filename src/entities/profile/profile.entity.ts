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
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Profile extends Model<Profile> {
  @PrimaryKey
  @Unique
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  @ApiProperty()
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  login: string;

  @Unique
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty()
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
  @ApiProperty()
  birthDate: string;

  @ForeignKey(() => Cities)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'restrict',
    allowNull: true,
  })
  @ApiProperty()
  cityId: number;

  @BelongsTo(() => Cities)
  city: Cities;
}
