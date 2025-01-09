/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import styles from './BlogItem.module.css'
const BlogItem = ({ item }) => {
	return (
		<div className={styles.blogItem}>
			<img
				src={item?.images?.[0]}
				className={styles.blogItemImage}
				alt={item?.title}
			/>
			<div className={styles.blogItemContent}>
				<div className={styles.blogItemInfo}>{item?.title}</div>
				<h3 className={styles.blogItemTitle}>{item?.subTitle}</h3>
				<div className={styles.blogItemDescription}>
					{item?.descriptionFull?.slice(0, 20) + '...'}
				</div>
				<Link to={`/blog/${item?.uid}`} className={styles.blogItemLink}>
					Read More...
				</Link>
			</div>
		</div>
	)
}

export default BlogItem
