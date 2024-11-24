import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { getProducts } from '../../store/productsSlice'
import { getSale } from '../../store/saleSlice'
import { Footer } from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Layout.module.css'

function Layout() {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getProducts())
		dispatch(getSale())
	}, [])

	return (
		<section className={styles.layout}>
			<Header />
			<Outlet />
			<Footer />
		</section>
	)
}

export default Layout
