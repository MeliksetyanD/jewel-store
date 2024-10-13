import { Router } from "express"
import ratemodel from "../models/ratemodel.js"
import user from "../models/usermodel.js"
import products from "../models/productmodel.js"
const router = Router()


router.get('/', async (req, res) => {
    try {
        const rates = await ratemodel.findAll(({ where: { productid: req.body.productid } }))
        const summ = ratesum(rates)

        res.status(200).json({ message: summ })
    } catch (e) {
        console.log(e)
        res.status(500).json({message:'error, try again'})

    }
})

router.post('/', async (req, res) => {
    try {
        const { userid, productid } = req.body
        const candidate = await user.findOne({ where: { uid: userid } })
        const product = await products.findOne({ where: { uid: productid } })

        if (candidate && product) {
            await ratemodel.create({
                productid: req.body.productid,
                userid: req.body.userid,
                starcount: req.body.starcount
            })
            res.status(200).json({ message: "ti astavil ocenku" })
        } else {
            res.status(200).json({ message: "ti ne astavil acenku" })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message:'error, try again'})
    }
})


export default router


function ratesum(rates) {
    const count = rates.length
    let sum = 0
    rates.forEach(obj => {
        sum += obj.starcount
    });
    return sum / count
}

