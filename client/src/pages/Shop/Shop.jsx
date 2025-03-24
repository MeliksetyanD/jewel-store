import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Filter from '../../components/Filter/Filter'
import Product from '../../components/Product/Product'
import useWindowDimensions from '../../components/UseDimession/useDimession'
import { SideFilter } from '../../features/SideFilter/SideFilter'
import useLang from '../../hooks/useLang'
import styles from './Shop.module.css'
const Shop = () => {
	const { height, width } = useWindowDimensions()
	const { language, languagesJson } = useLang()
	const { entities: products, loading } = useSelector(state => state.products)
	const [shopProducts, setShopProducts] = useState(products)
	const [scroll, setScroll] = useState(false)
	function handleMakeToNonScroll(open) {
		setScroll(open)
	}

	useEffect(() => {}, [products])
	return loading === 'pending' ? (
		<h1>Loading</h1>
	) : (
		loading === 'success' && (
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
						{shopProducts.length === 0
							? products.map(product => (
									<Product key={product.uid} uid={product.uid} {...product} />
							  ))
							: shopProducts.map(product => (
									<Product key={product.uid} uid={product.uid} {...product} />
							  ))}
					</div>
				</div>
			</section>
		)
	)
}

export default Shop
