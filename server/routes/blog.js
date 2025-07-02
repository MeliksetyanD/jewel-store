import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import blogmodel from '../models/blogmodel.js'
import authcheck from '../middleware/authcheck.js'
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
		const response = await blogmodel.findOne({ where: { uid: req.params.id } })

		if (!response) {
			return res.status(404).json({ message: 'Blog not found' })
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
		const blogs = await blogmodel.findAll()

		const blog = blogs.map(blog => {
			const images = JSON.parse(blog.dataValues.images).map(
				image => `${req.protocol}://${req.get('host')}/uploads/${image}`
			)
			blog.dataValues.images = images
			return blog.dataValues
		})

		res.status(200).json(blog)
	} catch (e) {
		console.error(e)
		res.status(500).json({ message: 'Error, try again' })
	}
})

router.post('/', authcheck, upload.array('images', 3), async (req, res) => {
	try {
		let images = []
		if (req.files) {
			images = req.files.map(file => file.filename)
		}
		const blog = await blogmodel.create({
			uid: uuidv4(),
			title: req.body.title,
			subTitle: req.body.subTitle,
			descriptionShort: req.body.descriptionShort,
			descriptionFull: req.body.descriptionFull,
			images: JSON.stringify(images),
		})

		res.status(201).json({ message: 'Blog added successfully', blog })
	} catch (error) {
		console.error('Error adding Blog:', error)
		res.status(500).json({ error: 'Error adding Blog' })
	}
})

router.delete('/:id', authcheck, async (req, res) => {
	try {
		const blog = await blogmodel.findAll({ where: { uid: req.params.id } })

		await Promise.all(JSON.parse(blog[0].images).map(async (name) => {
					try {
						await deleteImages(name)
					} catch (error) {
						console.log('no such')
					}
				}))

		await blog[0].destroy()

		res.status(200).json({ message: 'Удалено' })
	} catch (e) {
		console.log(e)
		res.status(404).json({ message: 'не найдено такого товара' })
	}
})

router.put('/:id', authcheck,  upload.array('images', 3), async (req, res) => {
	try {
		const blog = await blogmodel.findOne({ where: { uid: req.params.id } })

		if (!blog) {
			return res.status(404).json({ message: 'Blog not found' })
		}
		if (req.body.deletedImg && typeof req.body.deletedImg == 'string') {
			const name = req.body.deletedImg.slice(29)
			await deleteImages(name)
		}
		if (Array.isArray(req.body.deletedImg)) {
			req.body.deletedImg.forEach(async element => {
				const name = element.slice(29)
				await deleteImages(name)
			})
		}
		let newImages = []
		if (req.body.images) {
			const bodyImages =
				typeof req.body.images === 'string'
					? [req.body.images]
					: [...req.body.images]

			newImages = bodyImages.map(image => {
				return image.slice(33, image.length)
			})
		}
		if (req.files || req.file) {
			Promise.all(req.files.map(file => newImages.push(file.filename)))
			blog.images = JSON.stringify(newImages)
		}
		

	
		blog.title = req.body.title
		blog.subTitle = req.body.subTitle
		blog.descriptionShort = req.body.descriptionShort
		blog.descriptionFull = req.body.descriptionFull

		await blog.save()

		res.status(200).json({ message: 'Изменено' })

	} catch (e) {
		console.log(e)
		res.status(400).json({ message: 'error' })
	}
})

export default router
