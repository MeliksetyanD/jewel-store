import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BlogItem from '../../components/BlogItem/BlogItem'
import { getBlogsAdmin } from '../../store/adminSlice'
import styles from './BlogPage.module.css'
const BlogPage = () => {
	const [blogs, setBlogs] = useState([])
	const dispatch = useDispatch()
	const getBlogsHandler = async () => {
		try {
			const response = await dispatch(getBlogsAdmin())

			setBlogs(response.payload)
		} catch (error) {
			console.log(error)
		}
	}
	// console.log(blogs)

	useEffect(() => {
		getBlogsHandler()
	}, [])
	return (
		<section className={styles.blogPage}>
			{blogs?.map((item, index) => (
				<BlogItem item={item} key={index} />
			))}
		</section>
	)
}

export default BlogPage
