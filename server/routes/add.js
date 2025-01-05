import { Router } from 'express'
import multer from 'multer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'
import prodmodel from '../models/productmodel.js'
const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage })

router.get('/:id', async (req, res) => {
	try {
		const response = await prodmodel.findOne({ where: { uid: req.params.id } })

		if (!response) {
			return res.status(404).json({ message: 'Product not found' })
		}

		// Формируем полный URL для каждого изображения
		const images = JSON.parse(response.images).map(
			image => `${req.protocol}://${req.get('host')}/uploads/${image}`
		)

		// Обновляем данные ответа
		response.dataValues.images = images

		res.status(200).json(response.dataValues)
	} catch (e) {
		console.error(e)
		res.status(500).json({ message: 'Error, try again' })
	}
})

router.get('/', async (req, res) => {
	try {
		const products = await prodmodel.findAll()

		const prods = products.map(prod => {
			const images = JSON.parse(prod.dataValues.images).map(
				image => `${req.protocol}://${req.get('host')}/uploads/${image}`
			)
			prod.dataValues.images = images
			return prod.dataValues
		})

		res.status(200).json(prods)
	} catch (e) {
		console.error(e)
		res.status(500).json({ message: 'Error, try again' })
	}
})
// router.get('/', async (req, res) => {
// 	try {
// 		const products = await prodmodel.findAll()
// 		const data = products.map(async prod => {
// 			const images = JSON.parse(prod.dataValues.images)
// 			prod.dataValues.images = images
// 			console.log(prod.dataValues)

// 			return prod.dataValues
// 		})

// 		const prods = await Promise.all(data)

// 		res.status(200).json(prods)
// 	} catch (e) {
// 		console.log(e)
// 		res.status(500).json({ message: 'error, try again' })
// 	}
// })

router.post('/', upload.array('images', 3), async (req, res) => {
	try {
		const {
			name,
			price,
			description,
			count,
			sizes,
			colorus,
			weight,
			material,
			forSlide,
			categoryname,
		} = req.body
		const uid = req.body.uid || uuidv4()
		// Массив для хранения имён файлов изображений
		const images = req.files.map(file => file.filename) // Массив с именами файлов

		const product = await prodmodel.create({
			uid,
			name,
			price,
			description,
			count,
			sizes,
			colorus,
			weight,
			material,
			forSlide,

			categoryname,
			images: JSON.stringify(images), // Сохраняем массив в формате JSON
		})

		res.status(201).json({ message: 'Product added successfully', product })
	} catch (error) {
		console.error('Error adding product:', error)
		res.status(500).json({ error: 'Error adding product' })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const uid = req.params.id
		const product = await prodmodel.findAll({ where: { uid: uid } })
		await product[0].destroy()

		res.status(200).json({ message: 'Удалено' })
	} catch (e) {
		console.log(e)
		res.status(404).json({ message: 'не найдено такого товара' })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const product = await prodmodel.findOne({ where: { uid: req.params.id } })
		const link = { links: [] }
		link.links.push(req.body.images)
		const data = JSON.stringify(link)

		;(product.name = req.body.name),
			(product.price = req.body.price),
			(product.description = req.body.description),
			(product.count = req.body.count),
			(product.sizes = req.body.sizes),
			(product.colorus = req.body.colorus),
			(product.weight = req.body.weight),
			(product.material = req.body.material),
			(product.categoryname = req.body.categoryname),
			(product.images = data)

		await product.save()

		res.status(200).json({ message: 'Изменено' })
	} catch (e) {
		console.log(e)
		res.status(400).json({ message: 'error' })
	}
})

export default router
