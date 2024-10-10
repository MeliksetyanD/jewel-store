import { Link } from 'react-router-dom'
import HomeSlider from '../../components/HomeSlider/HomeSlider'

import Product from '../../components/Product/Product'
import styles from './Home.module.css'
const Home = () => {
	return (
		<div className={styles.home}>
			<HomeSlider />
			<div className={styles.homeContent}>
				<div className={styles.homeContentText}>
					<h1>Shop The Latest</h1>
					<Link to='/shop'>View all</Link>
				</div>
				<div className={styles.products}>
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
				</div>
			</div>
		</div>
	)
}

export default Home
