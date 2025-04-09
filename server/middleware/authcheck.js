import jwt from 'jsonwebtoken'


const secretKey = 'randomkey'

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(403).json({ message: "пользователь не авторизирован" })
        }
        const decodeData = jwt.verify(token, secretKey)
        req.user = decodeData
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: error })
    }
}