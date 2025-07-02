import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import authcheck from '../middleware/authcheck.js'
import { v4 as uuidv4 } from 'uuid'
import prodmodel from '../models/productmodel.js'
import { deleteImages } from '../utils/utilsfunctions.js'



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

router.post('/', authcheck, upload.array('images', 3), async (req, res) => {
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
			images: JSON.stringify(images),
		})

		res.status(201).json({ message: 'Product added successfully', product })
	} catch (error) {
		console.error('Error adding product:', error)
		res.status(500).json({ error: 'Error adding product' })
	}
})

router.delete('/:id', authcheck, async (req, res) => {
	try {
		const product = await prodmodel.findAll({ where: { uid: req.params.id } })

		await Promise.all(JSON.parse(product[0].images).map(async (name) => {
			try {
				await deleteImages(name)
			} catch (error) {
				console.log('no such')
			}
		}))

		await product[0].destroy()

		res.status(200).json({ message: 'Удалено' })
	} catch (e) {
		console.log(e)
		res.status(404).json({ message: 'не найдено такого товара' })
	}
})

router.put('/:id', authcheck, upload.array('images', 3), async (req, res) => {
	try {
		
		const product = await prodmodel.findOne({ where: { uid: req.params.id } })
	
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		if (req.body.deletedImg && typeof req.body.deletedImg == 'string') {
			const name = req.body.deletedImg.slice(29)
			await deleteImages(name)
		}
		if (Array.isArray(req.body.deletedImg)) {
			req.body.deletedImg.forEach(async (element) => {
				const name = element.slice(29)
				await deleteImages(name)
			});
		}
		let newImages = []
		if (req.body.images) {
			const bodyImages =
				typeof req.body.images === 'string'
					? [req.body.images]
					: [...req.body.images]

			newImages = bodyImages.map(image => {
				// const imagess = bodyImages.map(image => path.basename(image))
				// return image.slice(30, image.length)
				return image.split('/').pop()
			})
		}
		if (req.files) {
			Promise.all(req.files.map(file => newImages.push(file.filename)))
			product.images = JSON.stringify(newImages)
		}
		

		product.name = req.body.name
		product.price = req.body.price
		product.description = req.body.description
		product.count = req.body.count
		product.sizes = req.body.sizes
		product.colorus = req.body.colorus
		product.weight = req.body.weight
		product.material = req.body.material
		product.categoryname = req.body.categoryname
		product.forSlide = req.body.forSlide

		await product.save()

		res.status(200).json({ message: 'Изменено' })
	} catch (e) {
		console.log(e)
		res.status(400).json({ message: 'error' })
	}
})

export default router
