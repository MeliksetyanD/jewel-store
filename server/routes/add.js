import { Router } from "express"
import Product from "../models/product.js"
import dotenv from 'dotenv'
import authcheck from "../middleware/authcheck.js"

dotenv.config()






const router = Router()



router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const products = await Product.findById(id)
        

        res.status(200).json(products)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json(products)

    } catch (err) {
        console.log(err)
    }
})

router.post('/', authcheck, async (req, res) => {
    try {
        const images = []
        images.push(req.body.images)
        // const images = JSON.stringify(image)
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            count: req.body.count,
            sizes: req.body.sizes,
            colorus: req.body.colorus,
            weight: req.body.weight,
            material: req.body.material,
            categoryname: req.body.categoryname,
            images,
        })
        await product.save()
        res.status(200).json({ message: 'Добавлено', product })
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
        await Product.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Продукт успешно удален' })
    } catch (err) {
        console.log(err)
    }
})




export default router







/*

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const uploadImage = async () => {
    const formData = new FormData();
    formData.append('key', 'ВАШ_API_КЛЮЧ'); // Замените на ваш API-ключ
    formData.append('image', fs.createReadStream('/path/to/your/image.jpg'));

    try {
        const response = await axios.post('https://api.postimages.org/1/upload', formData, {
            headers: formData.getHeaders(),
        });
        console.log('Image URL:', response.data.data.url);
    } catch (error) {
        console.error('Ошибка загрузки:', error.response.data);
    }
};

uploadImage();

*/