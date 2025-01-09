/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlogAdmin, getBlogsAdmin } from '../../../store/adminSlice'
import styles from './BlogItemAdmin.module.css'

const BlogItemAdmin = ({ item: product }) => {
	const dispatch = useDispatch()
	const deleteHandle = () => {
		dispatch(deleteBlogAdmin(product.uid))
		setTimeout(() => {
			dispatch(getBlogsAdmin())
		}, 2000)
	}

	return (
		<div className={styles.item}>
			<img src={product?.images[0]} alt='img' className={styles.img} />
			<p>{product?.title}</p>
			<p>{product?.descriptionFull?.slice(0, 20) + '...'}</p>
			<div className={styles.buttons}>
				<Link
					to={`/admin/home/blog/update/${product.uid}`}
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

export default BlogItemAdmin
