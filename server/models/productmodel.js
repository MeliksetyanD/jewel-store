import  Sequelize  from "sequelize"
import sequelize from "../utils/connect.js"


const product = sequelize.define('Product',
     {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    uid: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    description:{
        type: Sequelize.STRING,
        allowNull: true
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    sizes: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    colorus: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    weight:{
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    material:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    categoryname:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    forSlide:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    images:{
        type: Sequelize.TEXT,
        allowNull: true,
    }
})



export default product



