import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductByIdAdmin } from '../../../store/adminSlice'
import styles from './CreateAndUpdatePage.module.css'
export const CreateAndUpdatePage = () => {
	const [prod, setProd] = useState([])

	const loading = useSelector(state => state.admin.loading)
	const onSubmit = e => {
		e.preventDefault()
		let formData = new FormData()
		console.log(Object.entries(prod.images))
		Object.entries(prod).forEach(([key, value]) => {
			if (key === 'images') {
				formData.append('images', JSON.stringify(prod.images))

				return
			}
			formData.append(key, value)
		})

		console.log(...formData)
		// dispatch(createProductAdmin(formData))
	}
	const { id } = useParams()
	const dispatch = useDispatch()
	const deleteImage = imgSrc => {
		setProd(prevState => {
			return {
				...prevState,
				images: [...prevState.images.filter(image => image !== imgSrc)],
			}
		})
	}

	const changeHandel = e => {
		setProd(prevState => {
			if (e.target.id === 'images') {
				return {
					...prevState,
					[e.target.id]: [...prevState.images, e.target.files[0]],
				}
			}
			return {
				...prevState,
				[e.target.id]: e.target.value,
			}
		})
	}

	useEffect(() => {
		if (id) {
			const getData = async () => {
				const res = dispatch(getProductByIdAdmin(id))
				const data = await res
				setProd(data.payload[0])
			}
			getData()
		}
	}, [id])

	return Object.entries(prod).length > 0 ? (
		loading === 'pending' ? (
			<p>Loading...</p>
		) : (
			<form onSubmit={onSubmit} className={styles.form} onChange={changeHandel}>
				<div className={styles.input}>
					<label htmlFor='name'> Name : </label>
					<input
						type='text'
						id='name'
						value={prod.name}
						placeholder={prod.name}
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor='price'> Price : </label>
					<input
						type='number'
						value={prod.price}
						id='price'
						placeholder={prod.price}
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor='description'> Description : </label>
					<input
						type='text'
						id='description'
						placeholder={prod.description}
						value={prod.description}
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor='count'> Count : </label>
					<input
						type='number'
						value={prod.count}
						id='count'
						placeholder={prod.count}
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor='sizes'> Sizes : </label>
					<input
						type='text'
						value={prod.sizes}
						id='sizes'
						placeholder={prod.sizes}
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor='colorus'> Colours : </label>
					<input
						type='text'
						value={prod.colours}
						id='colorus'
						placeholder={prod.colours}
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor='material'> Material : </label>
					<input
						type='text'
						value={prod.material}
						id='material'
						placeholder={prod.material}
					/>
				</div>
				<div className={styles.input}>
					<label htmlFor='select'>Category Name :</label>
					<select name='select' id='select' defaultValue={prod.categoryName}>
						<option value='earings'>earings</option>
						<option value='rings'>rings</option>

						<option value='bracelet'>bracelet</option>
						<option value='cuff'>cuff</option>
					</select>
				</div>
				<div className={styles.images + ' ' + styles.input}>
					<label htmlFor='images'> Images : </label>
					<div className={styles.imagesContainer}>
						{Array.isArray(prod.images) &&
							prod.images.map(el => (
								<img
									key={el}
									onClick={() => deleteImage(el)}
									alt='img'
									width={100}
									height={100}
									src={el}
								/>
							))}
					</div>
					<input
						accept='image/png, image/jpeg'
						type='file'
						id='images'
						placeholder='images1'
					/>
					<input
						accept='image/png, image/jpeg'
						type='file'
						id='images'
						placeholder='images2'
					/>
					<input
						accept='image/png, image/jpeg'
						type='file'
						id='images'
						placeholder='images3'
					/>
					<input
						accept='image/png, image/jpeg'
						type='file'
						id='images'
						placeholder='images4'
					/>
				</div>

				<button type='submit'>Submit</button>
			</form>
		)
	) : null
}
