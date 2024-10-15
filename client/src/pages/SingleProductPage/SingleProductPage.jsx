import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { sliderImages } from '../../../public/slider/sliderImages'
import Product from '../../components/Product/Product'
import Social from '../../components/Social/Social'
import Reviews from '../../features/Reviews/Reviews'
import Button from '../../ui/Button'
import styles from './SingleProductPage.module.css'

// {
//   "name": "zard",
//   "price": 15000,
//   "description": "req.body.description",
//   "count": 150,
//   "sizes": "req.body.size",
//   "colorus": "req.body.colorus",
//   "weight": 1.3,
//   "material": "req.body.material",
//   "categoryname": "req.body.categoryname",
//   "categorylink": "req.body.categorylink",
//   "images": "clouud.ru"
// }

export const SingleProductPage = () => {
	const [image, setImage] = useState(sliderImages[0])
	const [descShow, setDescShow] = useState('description' || description)
	const { id } = useParams()
	function addToCart(id) {
		console.log(id)
	}
	function showDescriptionContent(content) {
		setDescShow(content)
		console.log(content)
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
							<h2>{'Lira Earrings' || name}</h2>
							<h4>{'$ 68,00' || price}</h4>
						</section>
						<section className={styles.singleProductReviews}>
							<Reviews count={1} />

							<h3> {`reviews ` || reviews} </h3>
						</section>
						<section>
							<h5>{'Description' || description}</h5>
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
							<div>{'category' || category}</div>
						</section>
					</div>
				</div>
				<div className={styles.singleProductDescription}>
					<div className={styles.descriptionMenu}>
						<Link
							exact={true}
							className={`${styles.descriptionMenuLink} ${
								descShow === 'description' ? styles.active : ''
							}`}
							onClick={() => showDescriptionContent('description')}
						>
							Description
						</Link>
						<Link
							className={`${styles.descriptionMenuLink} ${
								descShow === 'additionalInfo' ? styles.active : ''
							}`}
							onClick={() => showDescriptionContent('additionalInfo')}
						>
							Additionl Information
						</Link>
						<Link
							className={`${styles.descriptionMenuLink} ${
								descShow === 'reviews' ? styles.active : ''
							}`}
							onClick={() => showDescriptionContent('reviews')}
						>
							Reviews
						</Link>
					</div>
					<div className={styles.descriptionShow}>{descShow}</div>
				</div>
			</div>
			<div className={styles.similarProducts}>
				<h3>Similar Items</h3>
				<div className={styles.similarProductsContent}>
					{sliderImages.map((image, index) => (
						<Product key={index} id={index} />
					))}
				</div>
			</div>
		</section>
	)
}
