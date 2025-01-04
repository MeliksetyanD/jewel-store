import bcrypt from "bcrypt"
import usermodel from "../models/usermodel.js"
import { Router } from "express"

const router = Router()


router.post('/log', async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await usermodel.findOne({ where: { email } })


    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error, try again'})
    }
})

export default router