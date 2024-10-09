import { Router } from "express"
import prodmodel from "../models/productmodel.js"
import { v4 as uuidv4 } from "uuid"
const router = Router()


router.get('/', async (req, res) => {
    try {
        res.status(200).json(await prodmodel.findAll())
    } catch (e) {
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    try {
        const prod = req.body
        // console.log(prod)
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
            images: req.body.images,
            rate: req.body.rate,
            reviews: req.body.reviews
        })
        res.status(200).json(prod)
    } catch (e) {
        console.log(e)
    }
})


export default router