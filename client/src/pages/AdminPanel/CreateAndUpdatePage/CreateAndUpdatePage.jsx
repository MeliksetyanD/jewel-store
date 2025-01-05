import axios from 'axios'
import React, { useState } from 'react'

const CreateAndUpdatePage = () => {
	const [forSlide, setForSlide] = useState(false)
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
	const [images, setImages] = useState([null, null, null]) // Массив для хранения 3 изображений

	// Обработчик изменения данных продукта

	const handleInputChange = e => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		})
	}

	// Обработчик изменения изображений
	const handleImageChange = e => {
		const files = e.target.files
		const newImages = [...images]

		// Убедимся, что пользователь может выбрать только 3 изображения
		if (files.length <= 3) {
			for (let i = 0; i < files.length; i++) {
				newImages[i] = files[i]
			}
		}
		setImages(newImages)
	}

	// Обработчик отправки формы
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

		// Добавляем изображения в FormData
		images.forEach((image, index) => {
			if (image) {
				formData.append(`images`, image) // Отправляем массив изображений
			}
		})
		console.log(...formData)

		try {
			const response = await axios.post(
				'http://localhost:4700/products',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			console.log('Product added successfully:', response.data)
		} catch (error) {
			console.error('Error adding product:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='name'
				placeholder='Product Name'
				onChange={handleInputChange}
			/>
			<input
				type='number'
				name='price'
				placeholder='Price'
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='description'
				placeholder='Description'
				onChange={handleInputChange}
			/>
			<input
				type='number'
				name='count'
				placeholder='Count'
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='sizes'
				placeholder='Sizes'
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='colorus'
				placeholder='Colorus'
				onChange={handleInputChange}
			/>
			<input
				type='number'
				step='0.01'
				name='weight'
				placeholder='Weight'
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='material'
				placeholder='Material'
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='categoryname'
				placeholder='Category Name'
				onChange={handleInputChange}
			/>
			<input
				type='checkbox'
				name='forSlide'
				placeholder='For Slide'
				onChange={() => setForSlide(prev => !prev)}
			/>
			{/* Поля для загрузки 3 изображений */}
			<input type='file' name='images' multiple onChange={handleImageChange} />

			<button type='submit'>Add Product</button>
		</form>
	)
}

export default CreateAndUpdatePage
