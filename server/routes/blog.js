import { Router } from "express"
import Blog from "../models/blog.js"
import dotenv from 'dotenv'
import authcheck from "../middleware/authcheck.js"

dotenv.config()






const router = Router()



router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)

        res.status(200).json(blog)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const blog = await Blog.find()

        res.status(200).json(blog)

    } catch (err) {
        console.log(err)
    }
})

router.post('/', authcheck, async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            description: req.body.description,
            images: req.body.images
        })
        await blog.save()
        res.status(200).json({ message: 'Добавлено'})
    } catch (err) {
        console.log(err)
    }
})

router.put('/', authcheck, async (req, res) => {
    try {
        const { _id } = req.body
        delete req.body._id
        await Product.findByIdAndUpdate(_id, req.body)

        res.status(200).json({ message: 'Изменено', })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', authcheck, async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Блог успешно удален' })
    } catch (err) {
        console.log(err)
    }
})




export default router
