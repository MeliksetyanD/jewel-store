import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../../store/productsSlice'
import styles from './CreateAndUpdatePage.module.css'
const CreateAndUpdatePage = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const [forSlide, setForSlide] = useState(false)
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
	const [images, setImages] = useState([null, null, null])
	const handleForChangeValues = async id => {
		try {
			if (!id) return
			const response = await dispatch(getProductById(id))

			setProductForChange(response.payload)
			setImages(response.payload.images)
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
				forSlide: forSlide,
			}
		})
	}
	console.log(product)

	const handleImageChange = e => {
		const files = e.target.files
		const newImages = [...images]
		console.log(files)

		Array.from(files).forEach((file, index) => {
			newImages.push(file)
		})
		// if (files.length <= 3) {
		// 	for (let i = 0; i < files.length; i++) {
		// 		newImages[i] = files[i]
		// 	}
		// }
		console.log(product)

		setProduct(prev => {
			return {
				...prev,
				...productForChange,
				images: newImages,
			}
		})
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
		// console.log(...formData)

		console.log(...formData)

		if (product.name.length === 0) {
			return
		}
		try {
			if (id) {
				const response = await axios.put(
					`http://localhost:4700/products/${id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				)
				console.log(response.data)
			} else {
				const response = await axios.post(
					'http://localhost:4700/products',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				)
				if (response.status === 201) {
					console.log('Product added successfully:', response.data)
				}
			}
		} catch (error) {
			console.error('Error adding product:', error)
		}
	}
	const imgDeleteHandler = src => {
		setProduct({
			...productForChange,
			images: productForChange.images.filter(image => image !== src),
		})
		setImages(prev => prev.filter(image => image !== src))
	}

	useEffect(() => {
		if (id) {
			handleForChangeValues(id)
		}
	}, [])

	return (
		<form onSubmit={handleSubmit}>
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
			<input
				type='text'
				name='categoryname'
				placeholder={
					productForChange ? productForChange.categoryname : 'Categoryname'
				}
				onChange={handleInputChange}
			/>
			<div>
				<label htmlFor='forSlide'>For Slide</label>
				<input
					type='checkbox'
					name='forSlide'
					checked={productForChange ? forSlide : productForChange?.forSlide}
					onChange={() => setForSlide(prev => !prev)}
				/>
			</div>
			<input type='file' name='images' multiple onChange={handleImageChange} />

			<button type='submit'>Add Product</button>
			<div className={styles.imagesBox}>
				{images?.some(image => typeof image === 'string')
					? images?.map((image, index) => {
							return (
								<div key={index}>
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
									<button onClick={() => imgDeleteHandler(image)}>X</button>
								</div>
							)
					  })
					: ''}
			</div>
		</form>
	)
}

export default CreateAndUpdatePage
