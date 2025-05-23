import Sequelize from "sequelize"
import sequelize from "../utils/connect.js"

const blog = sequelize.define('Blog', {
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
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriptionShort: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    descriptionFull: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    images: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


export default blog