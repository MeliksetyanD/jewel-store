import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import blogmodel from '../models/blogmodel.js'
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
		const blogs = await blogmodel.findAll()

		const blog = blogs.map(prod => {
			const images = JSON.parse(prod.dataValues.images).map(
				image => `${req.protocol}://${req.get('host')}/uploads/${image}`
			)
			prod.dataValues.images = images
			return prod.dataValues
		})

		res.status(200).json(blog)
	} catch (e) {
		console.error(e)
		res.status(500).json({ message: 'Error, try again' })
	}
})


router.post('/', upload.array('images', 3), async (req, res) => {
	try {
		const images = req.files.map(file => file.filename) 

		const blog = await blogmodel.create({
			uid: uuidv4(),
            title: req.body.title,
            description: req.body.description,
			images: JSON.stringify(images)
		})

		res.status(201).json({ message: 'Blog added successfully', blog })
	} catch (error) {
		console.error('Error adding Blog:', error)
		res.status(500).json({ error: 'Error adding Blog' })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const path = '../server/uploads/'
		const blog = await blogmodel.findAll({ where: { uid: req.params.id } })
        
		const images = JSON.parse(blog[0].images).map((imgpath)=>{
			
             const fullPath = path + imgpath
			 fs.unlinkSync(fullPath)
		})
		
		await blog[0].destroy()

		res.status(200).json({ message: 'Удалено' })
	} catch (e) {
		console.log(e)
		res.status(404).json({ message: 'не найдено такого товара' })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const blog = await blogmodel.findOne({ where: { uid: req.params.id } })

        blog.title = req.body.title
        blog.description =  req.body.description
    
		await blog.save()

		res.status(200).json({ message: 'Изменено' })
	} catch (e) {
		console.log(e)
		res.status(400).json({ message: 'error' })
	}
})

export default router
