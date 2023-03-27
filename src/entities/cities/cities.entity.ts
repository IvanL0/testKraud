import { Profile } from '../profile/profile.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Unique,
  HasMany,
} from 'sequelize-typescript';

@Table
export class Cities extends Model<Cities> {
  @PrimaryKey
  @Unique
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  @ApiProperty()
  id: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  name: string;

  @HasMany(() => Profile)
  pofile: Profile[];
}
