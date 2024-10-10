import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Layout.module.css'

function Layout() {
	return (
		<section className={styles.layout}>
			<Header />
			<Outlet />
			<Footer />
		</section>
	)
}

export default Layout
