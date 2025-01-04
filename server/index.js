import express, { urlencoded } from 'express'
import sequelize from "./utils/connect.js"
import product from './models/productmodel.js'
import blogmodel from './models/blogmodel.js'
import cors from 'cors'
import session from 'express-session'
import add  from './routes/add.js'
import blog from './routes/blog.js'
import varmiddleware from "./middleware/variable.js"



const PORT = process.env.PORT || 4700

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Время жизни куки (в данном случае — 1 день)
        secure: false, // Устанавливать true, если используешь HTTPS
        httpOnly: true, // Защита от XSS, куки доступны только через HTTP (не JavaScript)
    }
}))
app.use(varmiddleware)
app.use(cors())
app.use('/products', add)
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


