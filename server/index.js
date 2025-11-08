import cors from 'cors'
import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import blogmodel from './models/blogmodel.js'
import product from './models/productmodel.js'
import add from './routes/add.js'
import auth from './routes/auth.js'
import blog from './routes/blog.js'
import sequelize from './utils/connect.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
const upload = multer({ dest: 'uploads/' })


const PORT = process.env.PORT || 4700

const app = express()

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per windowMs
// 	message: 'Too many requests, please try again later.',
// })

app.use('/uploads', (req, res, next) => {
	res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
	next();
}, express.static(path.join(__dirname, 'uploads')))

// app.use(limiter)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors({
// 	origin: 'http://192.168.0.104:5173', // укажи порт фронтенда!
// 	credentials: true
//   }))

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use('/products', add)
app.use('/auth', auth)
app.use('/blog',  blog)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


  

// product.sync()
// blogmodel.sync()

async function start() {
	try {
		await sequelize.sync()
		app.listen(PORT, () => {
			console.log(`server run on port ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()
