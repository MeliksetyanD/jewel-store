import express, { urlencoded } from 'express'
import cors from 'cors'
import add  from './routes/add.js'
import blog from './routes/blog.js'
import path from 'path'
import multer from 'multer'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)


const PORT = process.env.PORT || 4700
const upload = multer({ dest: 'uploads/' })
const app = express()
app.use(express.static(path.join(__filename, 'form.html')))



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
// app.use('/', async (req,res)=>{
//     res.sendFile(path.join(__filename, '..', 'form.html'))
//     console.log(req.body)

// })
// app.post('/photos/upload', upload.array('photos', 4), function (req, res, next) {
//     res.sendFile(path.join(__filename, '..', 'form.html'))
//     const data = req.files
//     console.log(data)
//   })
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


