import Sequelize from 'sequelize'

const NAME = 'jewelry_store'
const USER = 'root'
const PASSWORD = '12345678'

const sequelize = new Sequelize(NAME, USER, PASSWORD, {
	host: 3306,
	dialect: 'mysql',
})

export default sequelize
