import { Link } from 'react-router-dom'
import styles from './Product.module.css'
import img from './ddd.png'
const Product = () => {
	return (
		<Link className={styles.product} to='/product/:id'>
			<img src={img} alt='jewel' width={377} height={380} />
			<h3>Hal Earrings</h3>
			<h4>$ 68,00</h4>
		</Link>
	)
}

export default Product
