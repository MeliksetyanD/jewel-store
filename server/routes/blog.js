// routes/blog.js
import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import blogmodel from '../models/blogmodel.js'
import authcheck from '../middleware/authcheck.js'
import { deleteImages } from '../utils/utilsfunctions.js'

const router = Router()


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

const toPublicUrls = (req, names) => {
  const base = `${req.protocol}://${req.get('host')}/uploads/`
  return (names || []).map(n => base + n)
}


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
  limits: { files: 3, fileSize: 5 * 1024 * 1024 } // до 3 файлов, по 5MB
})


router.get('/:id', async (req, res) => {
  try {
    const blog = await blogmodel.findOne({ where: { uid: req.params.id } })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })

    const raw = parseImages(blog.images)
    const json = blog.toJSON()
    json.images = toPublicUrls(req, raw)

    return res.status(200).json(json)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Error, try again' })
  }
})


router.get('/', async (req, res) => {
  try {
    const blogs = await blogmodel.findAll()
    const data = blogs.map(b => {
      const j = b.toJSON()
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


router.post('/', authcheck, upload.array('images', 3), async (req, res) => {
  try {
    const images = [...new Set((req.files || []).map(f => f.filename))]

    const created = await blogmodel.create({
      uid: uuidv4(),
      title: req.body.title,
      subTitle: req.body.subTitle,
      descriptionShort: req.body.descriptionShort,
      descriptionFull: req.body.descriptionFull,
      images: JSON.stringify(images)
    })

    const json = created.toJSON()
    json.images = toPublicUrls(req, images)

    return res.status(201).json({ message: 'Blog added successfully', blog: json })
  } catch (error) {
    console.error('Error adding Blog:', error)
    return res.status(500).json({ error: 'Error adding Blog' })
  }
})

router.delete('/:id', authcheck, async (req, res) => {
  try {
    const blog = await blogmodel.findOne({ where: { uid: req.params.id } })
    if (!blog) return res.status(404).json({ message: 'не найдено такого блога' })

    const imgs = parseImages(blog.images)
    await Promise.all(
      imgs.map(async name => {
        try { await deleteImages(name) } catch { /* no-op */ }
      })
    )

    await blog.destroy()
    return res.status(200).json({ message: 'Удалено' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Ошибка удаления' })
  }
})


router.put('/:id', authcheck, upload.array('images', 3), async (req, res) => {
  try {
    const blog = await blogmodel.findOne({ where: { uid: req.params.id } })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })


    if (req.body.deletedImg) {
      const delList = Array.isArray(req.body.deletedImg) ? req.body.deletedImg : [req.body.deletedImg]
      for (const url of delList) {
        const name = (url || '').split('/').pop()
        if (name) {
          try { await deleteImages(name) } catch { /* no-op */ }
        }
      }
    }

    let keep = []
    if (req.body.images) {
      const bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images]
      keep = bodyImages.map(u => (u || '').split('/').pop()).filter(Boolean)
    }
    const added = (req.files || []).map(f => f.filename)
    const finalImages = [...new Set([...keep, ...added])]

    blog.images = JSON.stringify(finalImages)

    const fields = ['title', 'subTitle', 'descriptionShort', 'descriptionFull']
    fields.forEach(k => { if (k in req.body) blog[k] = req.body[k] })

    await blog.save()

    const json = blog.toJSON()
    json.images = toPublicUrls(req, finalImages)

    return res.status(200).json({ message: 'Изменено', blog: json })
  } catch (e) {
    console.error(e)
    return res.status(400).json({ message: 'error' })
  }
})

export default router
