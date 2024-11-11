import express, { urlencoded } from 'express'
import sequelize from "./utils/connect.js"
import product from './models/productmodel.js'
import blogmodel from './models/blogmodel.js'
import cors from 'cors'
import add  from './routes/add.js'
import blog from './routes/blog.js'



const PORT = process.env.PORT || 4700

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/add', add)
app.use('/blog', blog)




product.sync()
blogmodel.sync()

async function start(){
    try {
        await sequelize.sync()
        app.listen(PORT, ()=>{
            console.log(`server run on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}



start()


