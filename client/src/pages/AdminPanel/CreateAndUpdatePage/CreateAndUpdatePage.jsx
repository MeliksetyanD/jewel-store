// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import { categories } from '../../../constants/categories'
// import { checkAuth } from '../../../features/auth'
// import { getProductById } from '../../../store/productsSlice'
// import styles from './CreateAndUpdatePage.module.css'
// const CreateAndUpdatePage = () => {
// 	const navigate = useNavigate()
// 	const { id } = useParams()
// 	const dispatch = useDispatch()
// 	const [forSlide, setForSlide] = useState(false)
// 	const [deletedImages, setDeletedImages] = useState([])
// 	const [productForChange, setProductForChange] = useState(null)
// 	const [product, setProduct] = useState({
// 		name: '',
// 		price: '',
// 		description: '',
// 		count: '',
// 		sizes: '',
// 		colorus: '',
// 		weight: '',
// 		material: '',
// 		categoryname: categories?.[0],
// 		forSlide: '',
// 	})

// 	const [images, setImages] = useState([])
// 	const handleForChangeValues = async id => {
// 		try {
// 			if (!id) return
// 			const response = await dispatch(getProductById(id))

// 			setProductForChange({ ...response.payload, deletedImg: [] })
// 			setImages(response.payload.images)
// 			setForSlide(response.payload.forSlide)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}
// 	const handleInputChange = e => {
// 		setProduct(prev => {
// 			return {
// 				...prev,
// 				...productForChange,
// 				[e.target.name]: e.target.value,
// 				forSlide: !forSlide,
// 			}
// 		})

// 		if (e.target.name === 'forSlide') setForSlide(prev => !prev)
// 	}
// 	const handleImageChange = e => {
// 		const files = e.target.files
// 		const newImages = [...images]

// 		Array.from(files).forEach((file, index) => {
// 			newImages.push(file)
// 		})

// 		setProduct(prev => {
// 			return {
// 				...prev,
// 				...productForChange,
// 				images: newImages,
// 			}
// 		})
// 		console.log(newImages)

// 		setImages(newImages)
// 	}

// 	const handleSubmit = async e => {
// 		e.preventDefault()

// 		const formData = new FormData()
// 		formData.append('name', product.name)
// 		formData.append('price', product.price)
// 		formData.append('description', product.description)
// 		formData.append('count', product.count)
// 		formData.append('sizes', product.sizes)
// 		formData.append('colorus', product.colorus)
// 		formData.append('weight', product.weight)
// 		formData.append('material', product.material)
// 		formData.append('categoryname', product.categoryname)
// 		formData.append('forSlide', forSlide)

// 		images.forEach((image, index) => {
// 			if (image) {
// 				formData.append(`images`, image)
// 			}
// 		})

// 		deletedImages.forEach((image, index) => {
// 			if (image) {
// 				formData.append(`deletedImg`, image)
// 			}
// 		})

// 		if (product.name.length === 0) {
// 			return
// 		}
// 		try {
// 			if (id) {
// 				const token = localStorage.getItem('bearer')
// 				if (!token) return
// 				const response = await axios.put(
// 					`http://localhost:4700/products/${id}`,
// 					formData,
// 					{
// 						headers: {
// 							authorization: await checkAuth(),
// 							'Content-Type': 'multipart/form-data',
// 						},
// 					}
// 				)
// 				console.log(response.status)

// 				if (response.status === 200) {
// 					navigate('/admin/home/products')
// 					setTimeout(() => {
// 						window.location.reload()
// 					}, 2000)

// 					console.log('Product added successfully:', response.data)
// 				}
// 				console.log(response.data)
// 			} else {
// 				const token = localStorage.getItem('bearer')
// 				if (!token) return
// 				const response = await axios.post(
// 					'http://localhost:4700/products',
// 					formData,
// 					{
// 						headers: {
// 							authorization: await checkAuth(),
// 							'Content-Type': 'multipart/form-data',
// 						},
// 					}
// 				)
// 				if (response.status === 201) {
// 					navigate('/admin/home/products')
// 					console.log('Product added successfully:', response.data)
// 				}
// 			}
// 		} catch (error) {
// 			console.error('Error adding product:', error)
// 		}
// 	}
// 	const imgDeleteHandler = src => {
// 		if (typeof src == 'string') {
// 			setDeletedImages(prev => [...prev, src])
// 		}
// 		setProduct(prev => {
// 			return {
// 				...productForChange,
// 			}
// 		})
// 		setImages(prev => prev.filter(image => image !== src))
// 	}

// 	useEffect(() => {
// 		if (id) {
// 			handleForChangeValues(id)
// 		}
// 	}, [])
// 	return (
// 		<form onSubmit={handleSubmit} className={styles.form}>
// 			<input
// 				type='text'
// 				name='name'
// 				placeholder={productForChange ? productForChange.name : 'Name'}
// 				onChange={handleInputChange}
// 			/>
// 			<input
// 				type='number'
// 				name='price'
// 				placeholder={productForChange ? productForChange.price : 'Price'}
// 				onChange={handleInputChange}
// 			/>
// 			<input
// 				type='text'
// 				name='description'
// 				placeholder={
// 					productForChange ? productForChange.description : 'Description'
// 				}
// 				onChange={handleInputChange}
// 			/>
// 			<input
// 				type='number'
// 				name='count'
// 				placeholder={productForChange ? productForChange.count : 'Count'}
// 				onChange={handleInputChange}
// 			/>
// 			<input
// 				type='text'
// 				name='sizes'
// 				placeholder={productForChange ? productForChange.sizes : 'Sizes'}
// 				onChange={handleInputChange}
// 			/>
// 			<input
// 				type='text'
// 				name='colorus'
// 				placeholder={productForChange ? productForChange.colorus : 'Colorus'}
// 				onChange={handleInputChange}
// 			/>
// 			<input
// 				type='number'
// 				step='0.01'
// 				name='weight'
// 				placeholder={productForChange ? productForChange.weight : 'Weight'}
// 				onChange={handleInputChange}
// 			/>
// 			<input
// 				type='text'
// 				name='material'
// 				placeholder={productForChange ? productForChange.material : 'Material'}
// 				onChange={handleInputChange}
// 			/>
// 			<select
// 				name='categoryname'
// 				id='categoryname'
// 				onChange={handleInputChange}
// 				value={productForChange ? productForChange.categoryname : ''}
// 			>
// 				{categories?.slice(0, 4).map((category, index) => {
// 					return (
// 						<option key={index} value={category}>
// 							{category}
// 						</option>
// 					)
// 				})}
// 			</select>

// 			<div className={styles.forSlide}>
// 				<label htmlFor='forSlide'>For Slide</label>
// 				<input
// 					type='checkbox'
// 					name='forSlide'
// 					checked={forSlide}
// 					onChange={handleInputChange}
// 				/>
// 			</div>
// 			<input
// 				type='file'
// 				className={styles.file}
// 				name='images'
// 				multiple
// 				onChange={handleImageChange}
// 			/>

// 			<button
// 				type='submit'
// 				className={`${styles.buttonAdd} ${
// 					product.name.length === 0 && styles.stop
// 				}`}
// 			>
// 				Add Product
// 			</button>
// 			<div className={styles.imagesBox}>
// 				{images?.map((image, index) => {
// 					return (
// 						<div key={index} className={styles.imageBoxWrapper}>
// 							<img
// 								className={styles.image}
// 								key={index}
// 								src={
// 									typeof image === 'string'
// 										? image
// 										: URL.createObjectURL(
// 												new Blob([image], { type: 'application/zip' })
// 										  )
// 								}
// 								alt={`Image ${index}`}
// 							/>
// 							<button
// 								type='button'
// 								onClick={() => imgDeleteHandler(image)}
// 								className={styles.deleteImg}
// 							>
// 								X
// 							</button>
// 						</div>
// 					)
// 				})}
// 			</div>
// 		</form>
// 	)
// }

// export default CreateAndUpdatePage



import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { categories } from '../../../constants/categories'
import { checkAuth } from '../../../features/auth'
import { getProductById } from '../../../store/productsSlice'
import styles from './CreateAndUpdatePage.module.css'

const MAX_IMAGES = 3
const API = import.meta.env.VITE_API_URL || 'http://localhost:4700'

export default function CreateAndUpdatePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [forSlide, setForSlide] = useState(false)
  const [deletedImages, setDeletedImages] = useState([])

  // images может содержать строки-URL (из БД) и File-объекты (новые)
  const [images, setImages] = useState([])

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    count: '',
    sizes: '',
    colorus: '',
    weight: '',
    material: '',
    categoryname: categories?.[0] ?? '',
  })

  // previews для File-объектов
  const previews = useMemo(() => images.map(img => (
    typeof img === 'string' ? img : URL.createObjectURL(img)
  )), [images])

  useEffect(() => () => { // revoke blobs on unmount
    previews.forEach(url => url?.startsWith('blob:') && URL.revokeObjectURL(url))
  }, [previews])

  useEffect(() => {
    if (!id) return
    (async () => {
      try {
        setLoading(true)
        const resp = await dispatch(getProductById(id))
        const data = resp.payload
        setProduct({
          name: data.name ?? '',
          price: data.price ?? '',
          description: data.description ?? '',
          count: data.count ?? '',
          sizes: data.sizes ?? '',
          colorus: data.colorus ?? '',
          weight: data.weight ?? '',
          material: data.material ?? '',
          categoryname: data.categoryname ?? (categories?.[0] ?? ''),
        })
        setImages(data.images ?? [])
        setForSlide(Boolean(data.forSlide))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [id, dispatch])

  const onChangeField = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'forSlide') {
      setForSlide(type === 'checkbox' ? checked : value === 'true')
    } else {
      setProduct(p => ({ ...p, [name]: value }))
    }
  }

  const onAddImages = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const current = images.slice()
    const remaining = Math.max(0, MAX_IMAGES - current.length)
    const toAdd = files.slice(0, remaining)
    setImages([...current, ...toAdd])
    e.target.value = ''
  }

  const removeImage = (item) => {
    setImages(prev => prev.filter(i => i !== item))
    if (typeof item === 'string') {
      setDeletedImages(prev => [...prev, item])
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!product.name?.trim()) return

    const fd = new FormData()
    fd.append('name', product.name.trim())
    fd.append('price', String(product.price ?? ''))
    fd.append('description', product.description ?? '')
    fd.append('count', String(product.count ?? ''))
    fd.append('sizes', product.sizes ?? '')
    fd.append('colorus', product.colorus ?? '')
    fd.append('weight', String(product.weight ?? ''))
    fd.append('material', product.material ?? '')
    fd.append('categoryname', product.categoryname ?? '')
    fd.append('forSlide', String(forSlide))

    images.forEach(img => {
      if (img instanceof File) fd.append('images', img)
      else fd.append('images', img) // строковые URL — чтобы бек их “сохранил как keep”
    })

    deletedImages.forEach(url => fd.append('deletedImg', url))

    try {
      setLoading(true)
      const headers = {
        authorization: await checkAuth(),
        'Content-Type': 'multipart/form-data'
      }
      const url = id ? `${API}/products/${id}` : `${API}/products`
      const method = id ? 'put' : 'post'
      const resp = await axios[method](url, fd, { headers })

      if (resp.status === (id ? 200 : 201)) {
        navigate('/admin/home/products', { replace: true })
      }
    } catch (err) {
      console.error('Save error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.form} aria-busy={loading}>
      <header className={styles.header}>
        <h2 className={styles.h2}>{id ? 'Update product' : 'Create product'}</h2>
        <button
          type='submit'
          className={`${styles.primaryBtn} ${!product.name?.trim() ? styles.disabled : ''}`}
          disabled={!product.name?.trim() || loading}
        >
          {loading ? 'Saving…' : (id ? 'Save changes' : 'Add Product')}
        </button>
      </header>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Name</label>
          <input name='name' value={product.name} onChange={onChangeField} placeholder='Name' />
        </div>

        <div className={styles.field}>
          <label>Price</label>
          <input type='number' step='0.01' name='price' value={product.price} onChange={onChangeField} placeholder='0.00' />
        </div>

        <div className={styles.field}>
          <label>Count</label>
          <input type='number' name='count' value={product.count} onChange={onChangeField} placeholder='0' />
        </div>

        <div className={styles.field}>
          <label>Sizes</label>
          <input name='sizes' value={product.sizes} onChange={onChangeField} placeholder='e.g. S, M, L' />
        </div>

        <div className={styles.field}>
          <label>Color</label>
          <input name='colorus' value={product.colorus} onChange={onChangeField} placeholder='Color' />
        </div>

        <div className={styles.field}>
          <label>Weight</label>
          <input type='number' step='0.01' name='weight' value={product.weight} onChange={onChangeField} placeholder='0.00' />
        </div>

        <div className={styles.field}>
          <label>Material</label>
          <input name='material' value={product.material} onChange={onChangeField} placeholder='Material' />
        </div>

        <div className={styles.field}>
          <label>Category</label>
          <select name='categoryname' value={product.categoryname} onChange={onChangeField}>
            {categories?.slice(0, 12).map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className={styles.fieldCheck}>
          <label htmlFor='forSlide'>For Slide</label>
          <input id='forSlide' type='checkbox' name='forSlide' checked={forSlide} onChange={onChangeField} />
        </div>

        <div className={styles.fieldFull}>
          <label>Description</label>
          <textarea name='description' value={product.description} onChange={onChangeField} rows={4} placeholder='Short description...' />
        </div>
      </div>

      <section className={styles.imagesArea}>
        <div className={styles.imagesHeader}>
          <h3>Images ({images.length}/{MAX_IMAGES})</h3>
          <label className={styles.uploadBtn}>
            <input
              type='file'
              name='images'
              accept='image/*'
              multiple
              onChange={onAddImages}
              hidden
              disabled={images.length >= MAX_IMAGES || loading}
            />
            + Add images
          </label>
        </div>

        <div className={styles.imagesGrid}>
          {previews.map((src, i) => (
            <figure key={i} className={styles.imgCard}>
              <img className={styles.img} src={src} alt={`preview ${i+1}`} />
              <button
                type='button'
                className={styles.remove}
                onClick={() => removeImage(images[i])}
                aria-label='Remove image'
              >
                ×
              </button>
            </figure>
          ))}
          {images.length === 0 && (
            <div className={styles.empty}>
              Загрузите до {MAX_IMAGES} изображений товара
            </div>
          )}
        </div>
      </section>
    </form>
  )
}

