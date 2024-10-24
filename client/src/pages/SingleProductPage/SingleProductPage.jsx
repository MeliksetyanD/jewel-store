import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { sliderImages } from '../../../public/slider/sliderImages'
import Product from '../../components/Product/Product'
import ShowDescriptionContent from '../../components/ShowDescriptions/ShowDescriptions'
import Social from '../../components/Social/Social'
import Reviews from '../../features/Stars/Stars'
import { products } from '../../product'
import Button from '../../ui/Button'
import styles from './SingleProductPage.module.css'
products

export const SingleProductPage = () => {
	const [image, setImage] = useState(sliderImages[0])

	const [product, setProduct] = useState(products[0])
	const [similarProducts, setSimilarProducts] = useState(products)

	const [rate, setRate] = useState({ sum: 4.5, count: 6 })

	const { id } = useParams()
	function addToCart(id) {
		console.log(id)
	}

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
							<h2>{product.name}</h2>
							<h4>{product.price} AMD</h4>
						</section>
						<section className={styles.singleProductReviews}>
							<Reviews count={rate.sum} />

							<h3> {rate.count} rates</h3>
						</section>
						<section>
							<h5>{product.description}</h5>
						</section>
						<section>
							<div className={styles.counts}></div>
							<Button
								text='Add to cart'
								type={'button'}
								onClick={() => addToCart(id)}
							/>
						</section>
						<section>
							<div className={styles.social}>
								<Social />
							</div>
						</section>
						<section>
							<div>{product.categoryname}</div>
						</section>
					</div>
				</div>
				<div className={styles.singleProductDescription}>
					<ShowDescriptionContent content={product} />
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
