import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import prodmodel from '../models/productmodel.js'
const router = Router()

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

		const images = JSON.parse(response.images).map(
			image => `${req.protocol}://${req.get('host')}/uploads/${image}`
		)

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


router.post('/', upload.array('images', 3), async (req, res) => {
	try {		  
		const images = req.files.map(file => file.filename) 

		const product = await prodmodel.create({
			uid: uuidv4(),
			name: req.body.name,
			price: req.body.price, 
			description: req.body.description,
			count: req.body.count,
			sizes: req.body.sizes,
			colorus: req.body.colorus,
			weight: req.body.weight,
			material: req.body.material,
			forSlide: req.body.forSlide,
			categoryname: req.body.categoryname,
			images: JSON.stringify(images)
		})

		res.status(201).json({ message: 'Product added successfully', product })
	} catch (error) {
		console.error('Error adding product:', error)
		res.status(500).json({ error: 'Error adding product' })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const path = '../server/uploads/'
		const product = await prodmodel.findAll({ where: { uid: req.params.id } })
        
		const images = JSON.parse(product[0].images).map((imgpath)=>{
             const fullPath = path + imgpath
			 fs.unlinkSync(fullPath)
		})

		await product[0].destroy()

		res.status(200).json({ message: 'Удалено' })
	} catch (e) {
		console.log(e)
		res.status(404).json({ message: 'не найдено такого товара' })
	}
})

router.put('/:id', upload.array('images', 3), async (req, res) => {
	try {
		const newImages = req.body.images
		const path = '../server/uploads/'
		const product = await prodmodel.findOne({ where: { uid: req.params.id } })
		const oldImages = JSON.parse(product.images)
		const images = req.files.map(file => newImages.push(file.filename))
		

		

		for (let i = 0; i < images.length; i++) {
			if (newImages[i] != oldImages[i]) {
				const fullPath = path + oldImages[i]
				fs.unlinkSync(fullPath)
			}
		}


		product.name = req.body.name,
		product.price = req.body.price,
		product.description = req.body.description,
		product.count = req.body.count,
		product.sizes = req.body.sizes,
		product.colorus = req.body.colorus,
		product.weight = req.body.weight,
		product.material = req.body.material,
		product.categoryname = req.body.categoryname,
		product.images = JSON.stringify(images),

		await product.save()

		res.status(200).json({ message: 'Изменено' })
	} catch (e) {
		console.log(e)
		res.status(400).json({ message: 'error' })
	}
})

export default router
