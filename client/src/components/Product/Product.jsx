import { Link } from 'react-router-dom'
import styles from './Product.module.css'
import img from './ddd.png'
const Product = ({ uid, name, price }) => {
	return (
		<Link className={styles.product} to={`/product/${uid}`}>
			<img src={img} alt='jewel' />
			<h3>{name}</h3>
			<h4>{price} AMD</h4>
		</Link>
	)
}

export default Product
