import { Router } from 'express'

const router = Router()

router.post('/log', async (req, res) => {
	try {
		const { login, password } = req.body
		console.log(login, password)

		if (login == 'admin' && password == '123') {
			req.session.isAuthenticated = true
			req.session.save(err => {
				if (err) {
					throw err
				}
				return res.status(200).json({ isAuth: true })
			})
		} else {
			return res.status(203).json({ message: 'wrong password', isAuth: false })
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'error, try again' })
	}
})

export default router
