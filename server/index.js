import express, { urlencoded } from 'express'
import cors from 'cors'
import add  from './routes/add.js'
import blog from './routes/blog.js'
import path from 'path'
import multer from 'multer'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)


const PORT = process.env.PORT || 4700
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const app = express()
app.use(express.static(path.join(__filename, 'form.html')))



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/add', add)
app.use('/blog', blog)





async function start(){
    try {
        app.listen(PORT, ()=>{
            console.log(`server run on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}



start()


