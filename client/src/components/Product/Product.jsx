import { Link } from 'react-router-dom'
import styles from './Product.module.css'

const Product = ({ uid, name, price, images }) => {
	return (
		<Link className={styles.product} to={`/product/${uid}`}>
			<img src={`http://localhost:3306${images[0]}`} alt='img' />
			<h3>{name}</h3>
			<h4>{price} AMD</h4>
		</Link>
	)
}

export default Product
