import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Product from '../../components/Product/Product'
import ShowDescriptionContent from '../../components/ShowDescriptions/ShowDescriptions'
import Social from '../../components/Social/Social'
import { products } from '../../product'

import { addToCart } from '../../store/cartSlice'
import { getProductById } from '../../store/productsSlice'
import Button from '../../ui/Button'
import styles from './SingleProductPage.module.css'
products

export const SingleProductPage = () => {
	const [data, setData] = useState([])
	const { id } = useParams()
	const dispatch = useDispatch()
	const {
		entities: products,
		singleProduct: product,
		loading,
	} = useSelector(state => state.products)

	const [image, setImage] = useState('')
	console.log(product)

	function addToCartHandler(item) {
		dispatch(addToCart(item))
	}
	async function getElementByIdHandler() {
		try {
			const response = await dispatch(getProductById(id))

			await setData(response.payload)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getElementByIdHandler()
	}, [id])
	return loading === 'pending' ? (
		<h1>Loading</h1>
	) : (
		loading === 'success' && (
			<section className={styles.singleProductPage}>
				<div className={styles.singleProductContainer}>
					<div className={styles.singleProductContent}>
						<div className={styles.singleProductImages}>
							<div className={styles.singleProductImageBox}>
								{product.length !== 0
									? product?.images.map((image, index) => (
											<img
												key={index}
												src={image}
												alt='jewel'
												className={styles.singleProductSliderImage}
												onClick={() => setImage(image)}
											/>
									  ))
									: ''}
							</div>
							<div className={styles.singleProductImagePreview}>
								<img
									src={image || product?.images?.[0]}
									alt='jewel'
									className={styles.singleProductSliderImage}
								/>
							</div>
						</div>
						<div className={styles.singleProductInfo}>
							<section className={styles.singleProductName}>
								<h2>{product?.name}</h2>
								<h4>{product?.price} AMD</h4>
							</section>

							<section>
								<h5>{product?.description}</h5>
							</section>
							<section>
								<ShowDescriptionContent content={product?.specs} />
							</section>
							<section>
								<Button
									text='Add to cart'
									type={'button'}
									onClick={() => addToCartHandler(product)}
								/>
							</section>
							<section>
								<div className={styles.social}>
									<Social />
								</div>
							</section>
						</div>
					</div>
				</div>
				<div className={styles.similarProducts}>
					<h3>Similar Items</h3>
					<div className={styles.similarProductsContent}>
						{products
							.filter(item => {
								return item.categoryName === product?.categoryName
							})
							.map((product, index) => (
								<Product
									key={index}
									uid={product.uid}
									name={product.name}
									price={product.price}
									{...product}
								/>
							))}
					</div>
				</div>
			</section>
		)
	)
}
