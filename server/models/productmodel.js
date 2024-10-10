import  Sequelize  from "sequelize"
import sequelize from "../utils/connect.js"


const product = sequelize.define('Product', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    uid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sizes: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    colorus: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    weight:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    material:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    categoryname:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    categorylink:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    images:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    rate:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    reviews: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default product


// {	
// 	reviews: [
// 	{
// 	username:,
// 	content:,
// 	stars:,
// 	date:,
// 	}


