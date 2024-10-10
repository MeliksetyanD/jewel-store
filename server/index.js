import express from 'express'
import sequelize from "./utils/connect.js"
import cors from 'cors'
import add  from './routes/add.js'
import register from "./routes/auth.js"
import registervalidation from "./validation/registervalidation.js"

const PORT = process.env.PORT || 4700

const app = express()
app.use(express.json())
app.use(cors())
app.use('/add', add)
app.use('/auth', registervalidation, register)




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


