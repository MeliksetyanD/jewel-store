/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductAdmin, getProductsAdmin } from '../../../store/adminSlice'
import styles from './AdminProduct.module.css'
const AdminProduct = ({ product }) => {
	const dispatch = useDispatch()
	const deleteHandle = () => {
		dispatch(deleteProductAdmin(product.uid))
		setTimeout(() => {
			dispatch(getProductsAdmin())
		}, 2000)
	}
	return (
		<div className={styles.item}>
			<img src={product.images[0]} alt='img' className={styles.img} />
			<p>{product.name}</p>
			<p>{product.price}</p>
			<div className={styles.buttons}>
				<Link
					to={`/admin/home/update/${product.uid}`}
					className={styles.button + ' ' + styles.update}
				>
					Update
				</Link>
				<button
					className={styles.button + ' ' + styles.delete}
					onClick={deleteHandle}
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default AdminProduct
