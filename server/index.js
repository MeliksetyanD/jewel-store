import express, { urlencoded } from 'express'
import sequelize from "./utils/connect.js"
import product from './models/productmodel.js'
import blogmodel from './models/blogmodel.js'
import cors from 'cors'
import session from 'express-session'
import connectSessionSequelize from 'connect-session-sequelize'
import multer from 'multer'
import add  from './routes/add.js'
import blog from './routes/blog.js'
import auth from './routes/auth.js'
import varmiddleware from "./middleware/variable.js"


const upload = multer({ dest: 'uploads/' })
const SequelizeStore = connectSessionSequelize(session.Store)


const store = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 15 * 60 * 1000
})


const PORT = process.env.PORT || 4700

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(varmiddleware)
app.use(cors())
app.use('/products', add)
app.use('/auth', auth)
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


