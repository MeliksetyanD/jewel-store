import { Router } from "express"

const router = Router()


router.post('/log', async (req, res) => {
    try {
        const { login, password } = req.body

        if (login == 'admin' && password == '12345678') {

            req.session.isAuthenticated = true
            req.session.save(err => {
                if (err) {
                    throw err
                }
                return res.status(200).json({message: 'auth'})
            })

        } else {
            return res.status(203).json({ message: "wrong password", isAuth: false })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error, try again'})
    }
})

export default router