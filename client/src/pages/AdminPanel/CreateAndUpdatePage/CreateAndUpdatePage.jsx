import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { categories } from '../../../constants/categories'
import { checkAuth } from '../../../features/auth'
import { getProductById } from '../../../store/productsSlice'
import styles from './CreateAndUpdatePage.module.css'
const CreateAndUpdatePage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const dispatch = useDispatch()
	const [forSlide, setForSlide] = useState(false)
	const [deletedImages, setDeletedImages] = useState([])
	const [productForChange, setProductForChange] = useState(null)
	const [product, setProduct] = useState({
		name: '',
		price: '',
		description: '',
		count: '',
		sizes: '',
		colorus: '',
		weight: '',
		material: '',
		categoryname: '',
		forSlide: '',
	})

	const [images, setImages] = useState([])
	const handleForChangeValues = async id => {
		try {
			if (!id) return
			const response = await dispatch(getProductById(id))

			setProductForChange({ ...response.payload, deletedImg: [] })
			setImages(response.payload.images)
			setForSlide(response.payload.forSlide)
		} catch (error) {
			console.log(error)
		}
	}
	const handleInputChange = e => {
		setProduct(prev => {
			return {
				...prev,
				...productForChange,
				[e.target.name]: e.target.value,
				forSlide: !forSlide,
			}
		})

		if (e.target.name === 'forSlide') setForSlide(prev => !prev)
	}
	const handleImageChange = e => {
		const files = e.target.files
		const newImages = [...images]

		Array.from(files).forEach((file, index) => {
			newImages.push(file)
		})

		setProduct(prev => {
			return {
				...prev,
				...productForChange,
				images: newImages,
			}
		})
		console.log(newImages)

		setImages(newImages)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('name', product.name)
		formData.append('price', product.price)
		formData.append('description', product.description)
		formData.append('count', product.count)
		formData.append('sizes', product.sizes)
		formData.append('colorus', product.colorus)
		formData.append('weight', product.weight)
		formData.append('material', product.material)
		formData.append('categoryname', product.categoryname)
		formData.append('forSlide', forSlide)

		images.forEach((image, index) => {
			if (image) {
				formData.append(`images`, image)
			}
		})

		deletedImages.forEach((image, index) => {
			if (image) {
				formData.append(`deletedImg`, image)
			}
		})

		if (product.name.length === 0) {
			return
		}
		try {
			if (id) {
				const token = localStorage.getItem('bearer')
				if (!token) return
				const response = await axios.put(
					`http://localhost:4700/products/${id}`,
					formData,
					{
						headers: {
							authorization: await checkAuth(),
							'Content-Type': 'multipart/form-data',
						},
					}
				)
				console.log(response.status)

				if (response.status === 200) {
					navigate('/admin/home/products')
					setTimeout(() => {
						window.location.reload()
					}, 2000)

					console.log('Product added successfully:', response.data)
				}
				console.log(response.data)
			} else {
				const token = localStorage.getItem('bearer')
				if (!token) return
				const response = await axios.post(
					'http://localhost:4700/products',
					formData,
					{
						headers: {
							authorization: await checkAuth(),
							'Content-Type': 'multipart/form-data',
						},
					}
				)
				if (response.status === 201) {
					navigate('/admin/home/products')
					console.log('Product added successfully:', response.data)
				}
			}
		} catch (error) {
			console.error('Error adding product:', error)
		}
	}
	const imgDeleteHandler = src => {
		if (typeof src == 'string') {
			setDeletedImages(prev => [...prev, src])
		}
		setProduct(prev => {
			return {
				...productForChange,
			}
		})
		setImages(prev => prev.filter(image => image !== src))
	}

	useEffect(() => {
		if (id) {
			handleForChangeValues(id)
		}
	}, [])
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type='text'
				name='name'
				placeholder={productForChange ? productForChange.name : 'Name'}
				onChange={handleInputChange}
			/>
			<input
				type='number'
				name='price'
				placeholder={productForChange ? productForChange.price : 'Price'}
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='description'
				placeholder={
					productForChange ? productForChange.description : 'Description'
				}
				onChange={handleInputChange}
			/>
			<input
				type='number'
				name='count'
				placeholder={productForChange ? productForChange.count : 'Count'}
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='sizes'
				placeholder={productForChange ? productForChange.sizes : 'Sizes'}
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='colorus'
				placeholder={productForChange ? productForChange.colorus : 'Colorus'}
				onChange={handleInputChange}
			/>
			<input
				type='number'
				step='0.01'
				name='weight'
				placeholder={productForChange ? productForChange.weight : 'Weight'}
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='material'
				placeholder={productForChange ? productForChange.material : 'Material'}
				onChange={handleInputChange}
			/>
			<select
				name='categoryname'
				id='categoryname'
				onChange={handleInputChange}
				value={productForChange ? productForChange.categoryname : ''}
			>
				{categories?.slice(0, 4).map((category, index) => {
					return (
						<option
							key={index}
							value={category}
							selected={productForChange ? productForChange.categoryname : ''}
						>
							{category}
						</option>
					)
				})}
			</select>
			{/* <input
				type='text'
				name='categoryname'
				placeholder={
					productForChange ? productForChange.categoryname : 'Categoryname'
				}
				onChange={handleInputChange}
			/> */}
			<div className={styles.forSlide}>
				<label htmlFor='forSlide'>For Slide</label>
				<input
					type='checkbox'
					name='forSlide'
					checked={forSlide}
					onChange={handleInputChange}
				/>
			</div>
			<input
				type='file'
				className={styles.file}
				name='images'
				multiple
				onChange={handleImageChange}
			/>

			<button
				type='submit'
				className={`${styles.buttonAdd} ${
					product.name.length === 0 && styles.stop
				}`}
			>
				Add Product
			</button>
			<div className={styles.imagesBox}>
				{images?.map((image, index) => {
					return (
						<div key={index} className={styles.imageBoxWrapper}>
							<img
								className={styles.image}
								key={index}
								src={
									typeof image === 'string'
										? image
										: URL.createObjectURL(
												new Blob([image], { type: 'application/zip' })
										  )
								}
								alt={`Image ${index}`}
							/>
							<button
								type='button'
								onClick={() => imgDeleteHandler(image)}
								className={styles.deleteImg}
							>
								X
							</button>
						</div>
					)
				})}
			</div>
		</form>
	)
}

export default CreateAndUpdatePage
