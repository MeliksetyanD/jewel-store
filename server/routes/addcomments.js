import { Router } from "express"
import commentsmodel from "../models/commentmodel.js"
import prodmodel from "../models/productmodel.js"
import usermodel from "../models/usermodel.js"


const router = Router()


router.get('/', async (req, res) => {
    try {
        res.status(200).json(await commentsmodel.findAll())
    } catch (e) {
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    try {
        const { userid, productid } = req.body
        const candidate = await usermodel.findOne({ where: { uid: userid } })
        const product = await prodmodel.findOne({ where: { uid: productid } })

        if (candidate && product) {
            await commentsmodel.create({
                productid: req.body.productid,
                userid: req.body.userid,
                comment: req.body.comment
            })
            res.status(200).json({ message: "ti astavil comment" })
        } else {
            res.status(200).json({ message: "ti ne astavil comment" })
        }

    } catch (e) {
        console.log(e)
    }
})


export default router