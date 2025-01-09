import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlogAdmin, getBlogsAdmin } from '../../../store/adminSlice'
import styles from './BlogItemAdmin.module.css'
const product = {
	id: 1,
	uid: 1,
	title: 'Product 1',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

	images: ['https://via.placeholder.com/150'],
	createdAt: '2022-01-01',
	updatedAt: '2022-01-01',
}
const BlogItemAdmin = () => {
	const dispatch = useDispatch()
	const deleteHandle = () => {
		dispatch(deleteBlogAdmin(product.uid))
		setTimeout(() => {
			dispatch(getBlogsAdmin())
		}, 2000)
	}
	return (
		<div className={styles.item}>
			<img src={product.images[0]} alt='img' className={styles.img} />
			<p>{product.title}</p>
			<p>{product.description.slice(0, 20) + '...'}</p>
			<div className={styles.buttons}>
				<Link
					to={`/admin/home/blog/update`}
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
