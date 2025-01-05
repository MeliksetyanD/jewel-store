import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import Product from '../../components/Product/Product'
import styles from './Home.module.css'
const Home = () => {
	const products = useSelector(state => state.products.entities)

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
						products.slice(0, 4).map(product => {
							return <Product key={product.uid} id={product._id} {...product} />
						})
					)}
				</div>
			</div>
		</div>
	)
}

export default Home
