import Sequelize from 'sequelize'

const NAME = 'jewelry_store'
const USER = 'root'
const PASSWORD = 'root'

const sequelize = new Sequelize(NAME, USER, PASSWORD, {
	host: 3306,
	dialect: 'mysql',
})

export default sequelize
