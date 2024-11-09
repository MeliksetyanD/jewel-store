import { Link } from 'react-router-dom'
import styles from './ErrorPage.module.css'

const ErrorPage = () => {
	return (
		<section className={styles.errorPageContainer}>
			<div className={styles.errorPage}>
				<h1>404 ERROR</h1>
				<p>This page not found; back to home and start again</p>
				<Link to='/'>HOMEPAGE</Link>
			</div>
		</section>
	)
}

export default ErrorPage
