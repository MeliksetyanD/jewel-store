import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import Product from '../../components/Product/Product'
import useLang from '../../hooks/useLang'
import styles from './Home.module.css'
const Home = () => {
	const products = useSelector(state => state.products.entities)
	const { language, languagesJson } = useLang()
	return (
		<div className={styles.home}>
			<HomeSlider />
			<div className={styles.homeContent}>
				<div className={styles.homeContentText}>
					<h1>{languagesJson[language].home.title}</h1>
					<Link to='/shop'>{languagesJson[language].home.view}</Link>
				</div>
				<div className={styles.products}>
					{products.length === 0 ? (
						<h1>Loading...</h1>
					) : (
						products
							.slice(0, 4)
							.map(product => (
								<Product key={product.id} id={product.id} {...product} />
							))
					)}
				</div>
			</div>
		</div>
	)
}

export default Home
