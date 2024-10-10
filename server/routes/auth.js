import bcrypt from "bcrypt"
import usermodel from "../models/usermodel.js"
import { Router } from "express"
import { v4 as uuidv4 } from "uuid"
import { validationResult } from "express-validator"

const router = Router()


router.post('/register', async (req, res) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const users = await usermodel.findAll()
        users.forEach(user => {
            if (user.email === req.body.email) {
                return res.status(412).json({
                    message: 'Такой емаил уже есть'
                }).redirect('/')
            }
        })

            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
    
            await usermodel.create({
                uid: uuidv4(),
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
    
            res.status(200).json({
                message: "Вы успешно зарегистрировались"
            })
             
    } catch (error) {
        console.log(error)
    }
})


export default router