import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import Product from '../../components/Product/Product'
import { getProducts } from '../../store/productsSlice'
import styles from './Home.module.css'
const Home = () => {
	const dispatch = useDispatch()
	const products = useSelector(state => state.products.entities)

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	return (
		<div className={styles.home}>
			<HomeSlider />
			<div className={styles.homeContent}>
				<div className={styles.homeContentText}>
					<h1>Shop The Latest</h1>
					<Link to='/shop'>View all</Link>
				</div>
				<div className={styles.products}>
					{products.length === 0 ? (
						<h1>Loading...</h1>
					) : (
						products.map(product => (
							<Product key={product.id} id={product.id} {...product} />
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default Home
