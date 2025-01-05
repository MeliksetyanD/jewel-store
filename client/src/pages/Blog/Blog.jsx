import { Outlet } from 'react-router-dom'
import styles from './Blog.module.css'
const Blog = () => {
	return (
		<div className={styles.blog}>
			<Outlet />
		</div>
	)
}

export default Blog
