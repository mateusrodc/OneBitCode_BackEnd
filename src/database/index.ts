import { Sequelize } from 'sequelize'
import { DATABASE_URL } from '../config/enviroment'

export const database = new Sequelize(DATABASE_URL,{
	define: {
    underscored: true
  },
  dialect: 'postgres',
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  }
})