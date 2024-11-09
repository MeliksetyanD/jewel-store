import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { sliderImages } from '../../../public/slider/sliderImages'
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
	const { id } = useParams()
	const dispatch = useDispatch()

	const [image, setImage] = useState(sliderImages[0])
	const products = useSelector(state => state.products.entities)
	const product = useSelector(state => state.products.singleProduct)
	const [similarProducts, setSimilarProducts] = useState(products)

	function addToCartHandler(item) {
		dispatch(addToCart(item))
	}

	useEffect(() => {
		dispatch(getProductById(id))
	}, [id])
	return (
		<section className={styles.singleProductPage}>
			<div className={styles.singleProductContainer}>
				<div className={styles.singleProductContent}>
					<div className={styles.singleProductImages}>
						<div className={styles.singleProductImageBox}>
							{sliderImages.map((image, index) => (
								<img
									key={index}
									src={image}
									alt='jewel'
									width={100}
									height={100}
									onClick={() => setImage(image)}
								/>
							))}
						</div>
						<div className={styles.singleProductImagePreview}>
							<img src={image} alt='jewel' width={400} height={400} />
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
							<ShowDescriptionContent content={product.specs} />
						</section>
						<section>
							<div className={styles.counts}></div>
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
					{similarProducts.map((product, index) => (
						<Product
							key={index}
							uid={product.uid}
							name={product.name}
							price={product.price}
						/>
					))}
				</div>
			</div>
		</section>
	)
}