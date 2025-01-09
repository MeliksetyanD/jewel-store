/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import BlogItemAdmin from '../BlogItemAdmin/BlogItemAdmin'
import styles from './BlogContent.module.css'

const BlogContent = () => {
	return (
		<div className={styles.item}>
			<div className={styles.header}>
				<h1>Blog Create</h1>
				<Link to={'/admin/home/blog/create'} className={styles.button}>
					Create
				</Link>
			</div>
			<div className={styles.items}>
				{[1, 2, 3, 4].map((item, index) => (
					<BlogItemAdmin item={item} key={index} />
				))}
			</div>
		</div>
	)
}

export default BlogContent
