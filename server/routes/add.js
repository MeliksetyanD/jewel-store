import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import authcheck from '../middleware/authcheck.js'
import prodmodel from '../models/productmodel.js'
import { deleteImages } from '../utils/utilsfunctions.js'

// ---------- Helpers ----------
const toBool = v => v === true || v === 'true' || v === 1 || v === '1'
const toInt = v => (v === '' || v == null ? null : parseInt(v, 10))
const toFloat = v => (v === '' || v == null ? null : parseFloat(v))

// безопасный парсер JSON массива картинок
const parseImages = val => {
  try {
    if (Array.isArray(val)) return val
    if (!val) return []
    const parsed = JSON.parse(val)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// конвертируем имена файлов в публичные URL
const toPublicUrls = (req, names) => {
  const base = `${req.protocol}://${req.get('host')}/uploads/`
  return (names || []).map(n => base + n)
}

// ---------- Multer ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${uuidv4()}${path.extname(file.originalname).toLowerCase()}`)
})

function fileFilter(req, file, cb) {
  const ok = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype)
  cb(ok ? null : new Error('Only images allowed'), ok)
}

const upload = multer({
  storage,
  fileFilter,
  limits: { files: 3, fileSize: 5 * 1024 * 1024 } // до 3 файлов, каждый до 5MB
})

const router = Router()

// ---------- GET /products/:id ----------
router.get('/:id', async (req, res) => {
  try {
    const product = await prodmodel.findOne({ where: { uid: req.params.id } })
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const raw = parseImages(product.images)
    const images = toPublicUrls(req, raw)

    const json = product.toJSON()
    json.images = images

    return res.status(200).json(json)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Error, try again' })
  }
})

// ---------- GET /products ----------
router.get('/', async (req, res) => {
  try {
    const products = await prodmodel.findAll()
    const data = products.map(p => {
      const j = p.toJSON()
      const raw = parseImages(j.images)
      j.images = toPublicUrls(req, raw)
      return j
    })
    return res.status(200).json(data)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Error, try again' })
  }
})

// ---------- POST /products ----------
router.post('/', authcheck, upload.array('images', 3), async (req, res) => {
  try {
    // дедупликация имён файлов на всякий случай
    const images = [...new Set((req.files || []).map(f => f.filename))]

    const created = await prodmodel.create({
      uid: uuidv4(),
      name: req.body.name,
      price: toFloat(req.body.price),
      description: req.body.description,
      count: toInt(req.body.count),
      sizes: req.body.sizes,
      colorus: req.body.colorus,
      weight: toFloat(req.body.weight),
      material: req.body.material,
      forSlide: toBool(req.body.forSlide),
      categoryname: req.body.categoryname,
      images: JSON.stringify(images)
    })

    const json = created.toJSON()
    json.images = toPublicUrls(req, images)

    return res.status(201).json({ message: 'Product added successfully', product: json })
  } catch (error) {
    console.error('Error adding product:', error)
    return res.status(500).json({ error: 'Error adding product' })
  }
})

// ---------- DELETE /products/:id ----------
router.delete('/:id', authcheck, async (req, res) => {
  try {
    const product = await prodmodel.findOne({ where: { uid: req.params.id } })
    if (!product) return res.status(404).json({ message: 'не найдено такого товара' })

    const imgs = parseImages(product.images)
    await Promise.all(
      imgs.map(async name => {
        try { await deleteImages(name) } catch { /* no-op */ }
      })
    )

    await product.destroy()
    return res.status(200).json({ message: 'Удалено' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Ошибка удаления' })
  }
})

// ---------- PUT /products/:id ----------
router.put('/:id', authcheck, upload.array('images', 3), async (req, res) => {
  try {
    const product = await prodmodel.findOne({ where: { uid: req.params.id } })
    if (!product) return res.status(404).json({ message: 'Product not found' })

    // 1) удалить отмеченные к удалению
    if (req.body.deletedImg) {
      const delList = Array.isArray(req.body.deletedImg) ? req.body.deletedImg : [req.body.deletedImg]
      for (const url of delList) {
        const name = (url || '').split('/').pop()
        if (name) {
          try { await deleteImages(name) } catch { /* no-op */ }
        }
      }
    }

    // 2) собрать итоговый массив картинок: оставшиеся из body + новые файлы
    let keep = []
    if (req.body.images) {
      const bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images]
      keep = bodyImages.map(u => (u || '').split('/').pop()).filter(Boolean)
    }
    const added = (req.files || []).map(f => f.filename)
    const finalImages = [...new Set([...keep, ...added])]

    product.images = JSON.stringify(finalImages)

    // 3) обновить остальные поля с приведением типов
    const fieldsRaw = ['name', 'description', 'sizes', 'colorus', 'material', 'categoryname']
    fieldsRaw.forEach(k => { if (k in req.body) product[k] = req.body[k] })

    if ('price' in req.body) product.price = toFloat(req.body.price)
    if ('count' in req.body) product.count = toInt(req.body.count)
    if ('weight' in req.body) product.weight = toFloat(req.body.weight)
    if ('forSlide' in req.body) product.forSlide = toBool(req.body.forSlide)

    await product.save()

    const json = product.toJSON()
    json.images = toPublicUrls(req, finalImages)

    return res.status(200).json({ message: 'Изменено', product: json })
  } catch (e) {
    console.error(e)
    return res.status(400).json({ message: 'error' })
  }
})

export default router
