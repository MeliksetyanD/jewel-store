import { Router } from "express"
import prodmodel from "../models/productmodel.js"
import { v4 as uuidv4 } from "uuid"
const router = Router()



router.get('/:id', async (req, res) => {
    try {

        const response = await prodmodel.findOne({ where: { uid: req.params.id } })
   

        res.status(200).json(response)

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await prodmodel.findAll()

    

        // console.log(products)


        res.status(200).json(products)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})

router.post('/', async (req, res) => {
    try {
        const forSlide = 1
        const link = { links: [] }
        link.links.push(req.body.images)
        const data = JSON.stringify(link)
        await prodmodel.create({
            uid: uuidv4(),
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            count: req.body.count,
            sizes: req.body.sizes,
            colorus: req.body.colorus,
            weight: req.body.weight,
            material: req.body.material,
            categoryname: req.body.categoryname,
            forSlide: req.body.forSlide,
            images: data
        })
        res.status(200).json({ message: 'Добавлено' })
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

