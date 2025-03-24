import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlogByIdAdmin } from '../../store/adminSlice'
import styles from './BlogSingle.module.css'
const BlogSingle = () => {
	const { id } = useParams()

	const [blog, setBlog] = useState([])
	const dispatch = useDispatch()
	const getBlogsByIdHandler = async () => {
		try {
			const response = await dispatch(getBlogByIdAdmin(id))

			setBlog(response.payload)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!id) return
		getBlogsByIdHandler()
	}, [])
	return (
		<div className={styles.blogSingle}>
			<h1>{blog?.title}</h1>
			<h5>{new Date(blog?.createdAt).toDateString()}</h5>
			<img src={blog?.images?.[0]} alt='' width={700} height={300} />
			<p>{blog?.descriptionFull}</p>
			{blog?.images?.length > 1 && (
				<img src={blog?.images[1]} width='400' height='300' alt='' />
			)}
			<h3>{blog?.subTitle}</h3>
			<p>{blog?.descriptionShort}</p>
		</div>
	)
}

export default BlogSingle
