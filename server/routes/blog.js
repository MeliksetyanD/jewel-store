import { Router } from "express"
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
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


const upload = multer({ dest: 'uploads/' })
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


router.post('/create', async (req, res) => {
    
})


router.get('/getblogs', async (req, res) => {
   
})


router.delete('/:id', async (req, res) => {
   
})



router.put('/:id', async (req, res) => {
    
})




export default router
