import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Product from '../../components/Product/Product'
import ShowDescriptionContent from '../../components/ShowDescriptions/ShowDescriptions'
import Social from '../../components/Social/Social'
import { products } from '../../product'

import useLang from '../../hooks/useLang'
import { addToCart } from '../../store/cartSlice'
import { getProductById } from '../../store/productsSlice'
import Button from '../../ui/Button'
import styles from './SingleProductPage.module.css'
products

export const SingleProductPage = () => {
	const [data, setData] = useState([])
	const { language, languagesJson } = useLang()
	const { id } = useParams()
	const dispatch = useDispatch()
	const {
		entities: products,
		singleProduct: product,
		loading,
	} = useSelector(state => state.products)

	const [image, setImage] = useState('')

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
		setImage('')
	}, [id])
	return loading === 'pending' ? (
		<h1>Loading</h1>
	) : (
		loading === 'success' && (
			<section className={styles.singleProductPage}>
				<div className={styles.singleProductContainer}>
					<div className={styles.singleProductContent}>
						<div className={styles.singleProductImages}>
							<div></div>
							<div className={styles.singleProductImageBoxWrapper}>
								<div className={styles.singleProductImageBox}>
									{product.length !== 0
										? product?.images.map((image, index) => (
												<div
													key={index}
													className={styles.singleProductImage}
													style={{ backgroundImage: `url(${image})` }}
													onClick={() => setImage(image)}
												></div>
										  ))
										: ''}
								</div>
								<div className={styles.singleProductImagePreview}>
									<div
										className={styles.singleProductImagePreviewImage}
										style={{
											backgroundImage: `url(${image || product?.images?.[0]})`,
										}}
									></div>
								</div>
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
									text={languagesJson[language].product.addToCart}
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
					<h3>{languagesJson[language].product.similarItems}</h3>
					<div className={styles.similarProductsContent}>
						{products
							.filter(item => {
								return item.categoryname === product?.categoryname
							})
							.map((product, index) => {
								return (
									<Product
										key={index}
										uid={product.uid}
										name={product.name}
										price={product.price}
										{...product}
									/>
								)
							})}
					</div>
				</div>
			</section>
		)
	)
}
