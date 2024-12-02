import { Router } from "express"

const router = Router()



router.post('/log', async (req, res) => {
    try {
        const { password } = req.body

            if (password == '12345678') {
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                })

            } else {
                return res.status(203).json({message:"wrong password"})
            }

            res.status(201).json({message: 'log in'})
        
        }
     catch (error) {
        console.log(error)
        res.status(500).json({message:'error, try again'})
    }
})

export default router