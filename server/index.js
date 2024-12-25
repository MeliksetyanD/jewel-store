import express, { urlencoded } from 'express'
import session from 'express-session'
import cors from 'cors'
import add  from './routes/add.js'
import blog from './routes/blog.js'
import auth from './routes/auth.js'
import varmiddleware from "./middleware/variable.js"
import mongoose from 'mongoose'




const url = 'mongodb+srv://aromiq1:J63AEdq3BxpmuEd@cluster0.buuvizz.mongodb.net/shoppe'



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
        secure: false,
        httpOnly: true, 
    }
}))
app.use(varmiddleware)
app.use(cors())
app.use('/products', add)
app.use('/auth', auth)
app.use('/blog', blog)





async function start(){
    try {
        await mongoose.connect(url)
        app.listen(PORT, ()=>{
            console.log(`server run on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}



start()


