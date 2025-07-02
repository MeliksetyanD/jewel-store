import { Router } from 'express'
import { generateAccessToken } from '../utils/utilsfunctions.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()


router.post('/login', async (req, res) => {
    try {

        const {login , password} = req.body

        const logHash = process.env.LOGIN
        const pasHash = process.env.PASSWORD

        if(!login || !password){
            return res.status(400).json({message: 'введен неправильный пароль'})
        }

        const validLogin = await bcrypt.compare(login , logHash)
        const validpassword = await bcrypt.compare(password, pasHash)


        if(!validpassword || !validLogin){
            return res.status(400).json({message: 'введен неправильный логин или пароль'})
        }

        const token =  await generateAccessToken(login)

        return res.json({token})
       
    } catch (error) {
        console.log(error)
    }

})


export default router
