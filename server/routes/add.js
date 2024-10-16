import { Router } from "express"
import prodmodel from "../models/productmodel.js"
import commentss from "../models/commentmodel.js"
// import ratess from "../models/ratemodel.js"

import user from "../models/usermodel.js"
import { v4 as uuidv4 } from "uuid"
import { where } from "sequelize"
const router = Router()





router.get('/get/:id', async (req, res) => {
    try {

        const response = await prodmodel.findAll()
        console.log(req.params.id)

        const comments = await commentss.findAll({ where: { productid: req.params.id } })

        const com = []


        for (const obj of comments) {
            const users = await user.findAll({ where: { uid: obj.userid } })
            console.log(users[0].username, users[0].uid, obj.comment)
            com.push({ name: users[0].username, rewiu: obj.comment, rate: obj.rate })
        }

        res.status(200).json({
            ...response[0].dataValues,
            revies: com,
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})




router.get('/', async (req, res) => {
    try {
        res.status(200).json(await prodmodel.findAll())
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})



router.post('/', async (req, res) => {
    try {
        const prod = req.body
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
            categorylink: req.body.categorylink,
            images: req.body.images
        })
        res.status(200).json(prod)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error, try again' })
    }
})


router.delete('/', async (req, res) => {
    try {
        const uid = req.body.uid
        const product = await prodmodel.findAll({
            where: {
                uid: uid
            }
        })
        await product[0].destroy()

        res.status(200).json({ message: 'Удалено' })
    } catch (e) {
        console.log(e)
        res.status(404).json({ message: 'не найдено такого товара' })
    }
})



export default router

