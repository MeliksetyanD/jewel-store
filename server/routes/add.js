import { Router } from "express"
import { v4 as uuidv4 } from "uuid"
import multer from 'multer'
import prodmodel from "../models/productmodel.js"
import authcheck from "../middleware/authcheck.js"
import path from 'path'

const router = Router()


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage })






router.get('/:id', async (req, res) => {
    try {

        const response = await prodmodel.findOne({ where: { uid: req.params.id } })
        const images = JSON.parse(response.images)
        response.images = images
        res.status(200).json(response)

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await prodmodel.findAll()
        const data = products.map(async (prod) => {

            const images = JSON.parse(prod.dataValues.images)
            prod.dataValues.images = images
            console.log(prod.dataValues)

            return prod.dataValues
        })

        const prods = await Promise.all(data)


        res.status(200).json(prods)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.post('/', authcheck, upload.array('images', 4) ,  async (req, res) => {
    try {
        const body = JSON.parse(req.body.body)
    

        const uploadpromises = req.files.map(async (file) => {
            const imageName = file.filename
            return imageName
        })

        const imagenames = await Promise.all(uploadpromises)

        const images = JSON.stringify(imagenames)

        await prodmodel.create({
            uid: uuidv4(),
            name: body.name,
            price: body.price,
            description: body.description,
            count: body.count,
            sizes: body.sizes,
            colorus: body.colorus,
            weight: body.weight,
            material: body.material,
            categoryname: body.categoryname,
            forSlide: body.forSlide,
            images
        })

        res.status(200).json({message: 'Добавлено'})
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const uid = req.params.id
        const product = await prodmodel.findAll({where: {uid: uid} })
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

            product.name = req.body.name,
            product.price = req.body.price,
            product.description = req.body.description,
            product.count = req.body.count,
            product.sizes = req.body.sizes,
            product.colorus = req.body.colorus,
            product.weight = req.body.weight,
            product.material = req.body.material,
            product.categoryname = req.body.categoryname,
            product.images = data

        await product.save()

        res.status(200).json({ message: 'Изменено' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'error' })
    }
})




export default router

