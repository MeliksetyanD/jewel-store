import express, { urlencoded } from 'express'
import sequelize from "./utils/connect.js"
import user from './models/usermodel.js'
import cors from 'cors'
import session from 'express-session'
import add  from './routes/add.js'
import register from "./routes/auth.js"
import comments from './routes/addcomments.js'
import rates from './routes/addrate.js'
import cart from './routes/cart.js'
import registervalidation from "./validation/registervalidation.js"
import varmiddleware from "./middleware/variable.js"



const PORT = process.env.PORT || 4700

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(varmiddleware)
app.use(cors())
app.use('/add', add)
app.use('/auth', registervalidation, register)
app.use('/addcomments', comments)
app.use('/addrate', rates)
app.use('/cart', cart)






user.sync()

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


