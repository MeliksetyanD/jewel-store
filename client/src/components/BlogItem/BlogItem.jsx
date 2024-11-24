import { Link } from 'react-router-dom'
import img from '../../public/SHOPPE.svg'
import styles from './BlogItem.module.css'
const BlogItem = () => {
	return (
		<div className={styles.blogItem}>
			<img src={img} className={styles.blogItemImage} alt='' />
			<div className={styles.blogItemContent}>
				<div className={styles.blogItemInfo}>Fashion - October 8, 2020</div>
				<h3 className={styles.blogItemTitle}>Top Trends From Spring</h3>
				<div className={styles.blogItemDescription}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Exercitationem, porro.
				</div>
				<Link to='/blog/single' className={styles.blogItemLink}>
					Read More...
				</Link>
			</div>
		</div>
	)
}

export default BlogItem
