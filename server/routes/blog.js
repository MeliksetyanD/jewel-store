import { Router } from "express"
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import {v4 as uuidv4} from 'uuid'
import { fileURLToPath } from 'url'
import { getSignedUrl} from "@aws-sdk/s3-request-presigner"
import mysql from 'mysql2'
import fs from 'fs'
import path from "path"
import connection from "../utils/connect.js"
import sharp from 'sharp'
import dotenv from 'dotenv'
import multer from 'multer'


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const BUCKET_REGION = process.env.BUCKET_REGION
const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_KEY = process.env.ACCESS_KEY
const BUCKET_SECRET_KEY = process.env.SECRET_ACCESS_KEY


const s3 = new S3Client({
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: BUCKET_KEY,
        secretAccessKey: BUCKET_SECRET_KEY,
    }
})

dotenv.config()
const router = Router()



router.post('/create', upload.array('images', 4), async (req, res) => {
    try {
        const thedata = req.body.body
        const body = JSON.parse(thedata)

        const uploadpromises = req.files.map(async (file) => {
            const imageName = uuidv4()
            const Buffer = await sharp(file.buffer).resize({ height: 5000, width: 3338, fit: 'contain' }).toBuffer()
            const params = {
                Bucket: BUCKET_NAME,
                Key: imageName,
                Body: Buffer,
                ContentType: file.mimetype,
            }
            const command = new PutObjectCommand(params)
            await s3.send(command)

            return imageName

        })
        const imagenames = await Promise.all(uploadpromises)
        const ids = {
            imagenames
        }
        const images = JSON.stringify(ids)
        const query = 'INSERT INTO Blogs (uid, title, description, images) VALUES (?, ?, ?, ?)'
        const uid = uuidv4()

        connection.query(query, [uid, body.title, body.description, images], (err, results) => {
            if (err) {
                console.error('Ошибка при вставке данных: ', err);
                return res.status(500).send('Ошибка сервера');
            }
            res.status(200).send(`Блог добавлен с ID: ${results.insertId}`);
        })
    } catch (err) {
        console.log(err)
    }
})


router.get('/getblogs', async (req, res) => {
    try {
        const query = 'SELECT * FROM Blogs';
        connection.query(query, async (err, results) => {
            if (err) {
                console.error('Ошибка при получении данных: ', err)
                return res.status(500).send('Ошибка сервера')
            }
            for (const element of results) {
                const image = JSON.parse(element.images)

                const links = []
                for (const element of image.imagenames) {
                    const getObjectParams = {
                        Bucket: BUCKET_NAME,
                        Key: element
                    }
                    const command = new GetObjectCommand(getObjectParams)
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
                    links.push(url)
                }
                element.images = links
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err)
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const query = 'SELECT * FROM Blogs WHERE uid = ?'
        const delquery = 'DELETE FROM Blogs WHERE uid = ?'

        connection.query(query,[req.params.id], async (err, results) => {
            if (err) {
                console.error('Ошибка при получении данных: ', err)
                return res.status(500).send('Ошибка сервера')
            }
            for (const element of results) {
                const image = JSON.parse(element.images)
                for (const element of image.imagenames) {
                    const getObjectParams = {
                        Bucket: BUCKET_NAME,
                        Key: element
                    }
                    const command = new DeleteObjectCommand(getObjectParams)
                    await s3.send(command)
                }
            }
            
        })

        connection.query(delquery,[req.params.id], async (err, results) => {
            if (err) {
                console.error('Ошибка при получении данных: ', err)
                return res.status(500).send('Ошибка сервера')
            }
                res.status(200).json({messsage: 'deleted'})
        })
    
    } catch (err) {
        console.log(err)
    }
})



router.put('/put/:id',upload.array('images', 4), async (req, res) => {
    try {
        const thedata = req.body.body
        const body = JSON.parse(thedata)
        const query = `UPDATE Blogs SET title=?, description=? WHERE uid = ?`



        connection.query(query, [body.title, body.description, req.params.id], (err) => {
            if (err) {
                console.log('Ошибка при вставке данных: ', err);
                return res.status(500).send(err);
            }
            res.status(200).send(`Блог успешно обновлен`);
        })
    } catch (error) {
        console.log(error)
    }
})




export default router
