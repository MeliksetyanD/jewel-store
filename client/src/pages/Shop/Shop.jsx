import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Filter from '../../components/Filter/Filter'
import Product from '../../components/Product/Product'
import useWindowDimensions from '../../components/UseDimession/useDimession'
import { SideFilter } from '../../features/SideFilter/SideFilter'
import styles from './Shop.module.css'
const Shop = () => {
	const { height, width } = useWindowDimensions()

	const products = useSelector(state => state.products.entities)
	const [shopProducts, setShopProducts] = useState(products)
	const [scroll, setScroll] = useState(false)
	function handleMakeToNonScroll(open) {
		setScroll(open)
	}
	console.log(scroll)

	useEffect(() => {}, [products])
	return (
		<section
			className={styles.shop}
			style={scroll ? { overflow: 'hidden' } : null}
		>
			<div className={styles.shopContent}>
				{width < 675 ? (
					<SideFilter
						setShopProducts={setShopProducts}
						handleMakeToNonScroll={handleMakeToNonScroll}
					/>
				) : (
					<Filter setShopProducts={setShopProducts} />
				)}
				<div className={styles.products}>
					{shopProducts &&
						shopProducts.map(product => (
							<Product key={product.id} id={product.id} {...product} />
						))}
				</div>
			</div>
		</section>
	)
}

export default Shop
