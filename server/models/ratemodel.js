import  Sequelize  from "sequelize"
import sequelize from "../utils/connect.js"



const rates = sequelize.define('Rate',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    productid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    starcount:{
        type: Sequelize.FLOAT,
        allowNull: false
    } 
})



export default rates






// CREATE TABLE ratings (
//     //     rating INT CHECK (rating BETWEEN 1 AND 5), -- Оценка от 1 до 5
//     //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     //     FOREIGN KEY (product_id) REFERENCES products(id),
//     //     FOREIGN KEY (user_id) REFERENCES users(id)
//     //   );