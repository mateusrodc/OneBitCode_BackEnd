import { DataTypes, Model, Optional } from 'sequelize'
import { database } from '../database'
import { Course  } from './Course'

export interface Category {
  id: number
  name: string
  position: number
  courses?: Course[];
}

export interface CategoryCreationAttributes extends Optional<Category, 'id'> {}

export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>, Category {}

export const Category = database.define<CategoryInstance, Category>('Category', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  position: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
})