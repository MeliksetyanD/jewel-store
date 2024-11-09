import BlogItem from '../../components/BlogItem/BlogItem'
import styles from './BlogPage.module.css'
const BlogPage = () => {
	return (
		<section className={styles.blogPage}>
			<BlogItem />
			<BlogItem />
			<BlogItem />
			<BlogItem />
		</section>
	)
}

export default BlogPage
