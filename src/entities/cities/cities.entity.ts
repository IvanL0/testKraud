import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Unique,
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
  id: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
