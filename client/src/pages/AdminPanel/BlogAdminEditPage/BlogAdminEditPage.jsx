import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { checkAuth } from '../../../features/auth'
import { getBlogByIdAdmin } from '../../../store/adminSlice'
import styles from './BlogAdminEditPage.module.css'
const BlogAdminEditPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const dispatch = useDispatch()

	const [deletedImages, setDeletedImages] = useState([])
	const [productForChange, setProductForChange] = useState(null)
	const [product, setProduct] = useState({
		title: '',
		subTitle: '',
		descriptionShort: '',
		descriptionFull: '',
		images: [],
	})
	const [images, setImages] = useState([])
	const handleForChangeValues = async id => {
		try {
			if (!id) return
			const response = await dispatch(getBlogByIdAdmin(id))
			setProductForChange({ ...response.payload, deletedImg: [] })
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
			}
		})
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
		setImages(newImages)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('title', product.title)
		formData.append('subTitle', product.subTitle)
		formData.append('descriptionShort', product.descriptionFull)
		formData.append('descriptionFull', product.descriptionShort)
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
		console.log(...formData)

		if (product.title.length === 0) {
			return
		}
		try {
			if (id) {
				const response = await axios.put(
					`http://localhost:4700/blog/${id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',

							authorization: await checkAuth(),
						},
					}
				)
				console.log(response.status)

				if (response.status === 200) {
					navigate('/admin/home/')
					console.log('Product added successfully:', response.data)
				}
				console.log(response.data)
			} else {
				const response = await axios.post(
					'http://localhost:4700/blog',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							authorization: await checkAuth(),
						},
					}
				)
				if (response.status === 201) {
					navigate('/admin/home/')
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
				name='subTitle'
				placeholder={productForChange ? productForChange.subTitle : 'subTitle'}
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='title'
				placeholder={productForChange ? productForChange.title : 'title'}
				onChange={handleInputChange}
			/>
			<textarea
				rows={5}
				cols={40}
				name='descriptionShort'
				placeholder={
					productForChange
						? productForChange.descriptionShort
						: 'Description Short'
				}
				onChange={handleInputChange}
			/>
			<textarea
				rows={5}
				cols={40}
				name='descriptionFull'
				placeholder={
					productForChange
						? productForChange.descriptionFull
						: 'Description Full'
				}
				onChange={handleInputChange}
			/>
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
					product.title?.length === 0 && styles.stop
				}`}
			>
				Add Blog
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

export default BlogAdminEditPage
