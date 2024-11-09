import img from '../../public/SHOPPE.svg'
import styles from './BlogSingle.module.css'
const BlogSingle = () => {
	return (
		<div className={styles.blogSingle}>
			<h1>Fast Fashion, And Faster Fashion</h1>
			<h5>October 8, 2020</h5>
			<img src={img} alt='' width={700} height={300} />
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
				libero asperiores delectus exercitationem, praesentium aliquid
				voluptatem. Aliquam doloribus officiis ullam?
			</p>
			<img src={img} width='400' height='300' alt='' />
			<h3>Fashion</h3>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
		</div>
	)
}

export default BlogSingle
