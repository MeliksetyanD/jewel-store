import { Link } from 'react-router-dom'
import styles from './Product.module.css'

const Product = ({ uid, name, price, images }) => {
	return (
		<Link className={styles.product} to={`/product/${uid}`}>
			<div
				className={styles.img}
				style={{ backgroundImage: `url(${images[0]})` }}
			></div>
			{/* <img src={images[0]} alt='dd' /> */}
			<h3>{name}</h3>
			<h4>{price} AMD</h4>
		</Link>
	)
}

export default Product
