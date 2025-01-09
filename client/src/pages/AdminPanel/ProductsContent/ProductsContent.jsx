import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AdminProduct from '../AdminProduct/AdminProduct'
import styles from './ProductsContent.module.css'
const ProductsContent = () => {
	const products = useSelector(state => state.admin.entities)

	useEffect(() => {}, [products])
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Product Create</h1>
				<Link to={'/admin/home/create'} className={styles.button}>
					Create
				</Link>
			</div>
			<div className={styles.items}>
				{products.map(product => {
					return <AdminProduct key={product.uid} product={product} />
				})}
			</div>
		</div>
	)
}

export default ProductsContent
