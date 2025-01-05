import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { getProductsAdmin } from '../../store/adminSlice'
import styles from './AdminPanel.module.css'

const links = ['blog', 'products']
const AdminPanel = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	useEffect(() => {
		if (!localStorage.getItem('isAuth')) navigate('/')
	}, [])
	function signOut() {
		localStorage.removeItem('isAuth')
		navigate('/')
	}

	useEffect(() => {
		dispatch(getProductsAdmin())
	}, [])
	return (
		<div className={styles.AdminPanel}>
			<div className={styles.container}>
				<div className={styles.sidebar}>
					<h1>Admin Panel</h1>
					<div className={styles.sidebarContent}>
						<ul>
							{links.map((link, index) => (
								<li key={index}>
									<Link to={`${link}`}>{link.toUpperCase()}</Link>
								</li>
							))}
						</ul>
						<button onClick={signOut}>Sign out</button>
					</div>
				</div>
				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default AdminPanel
