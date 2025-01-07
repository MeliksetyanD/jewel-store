import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearSingle } from '../../../store/adminSlice'
import AdminProduct from '../AdminProduct/AdminProduct'
import styles from './ProductsContent.module.css'
const ProductsContent = () => {
	const products = useSelector(state => state.admin.entities)
	const dispatch = useDispatch()
	useEffect(() => {}, [products])
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Product Create</h1>
				<Link
					to={'/admin/home/create'}
					onClick={dispatch(clearSingle())}
					className={styles.button}
				>
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