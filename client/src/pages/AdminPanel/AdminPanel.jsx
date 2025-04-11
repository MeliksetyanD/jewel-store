import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { getBlogsAdmin, getProductsAdmin } from '../../store/adminSlice'
import styles from './AdminPanel.module.css'

const links = ['blog', 'products']
const AdminPanel = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function signOut() {
		localStorage.removeItem('bearer')
		navigate('/')
	}

	useEffect(() => {
		if (!localStorage.getItem('bearer')) navigate('/admin')
		dispatch(getProductsAdmin())
		dispatch(getBlogsAdmin())
	}, [])
	return (
		<div className={styles.AdminPanel}>
			<div className={styles.container}>
				<div className={styles.sidebar}>
					<Link to={'/admin/home'}>Admin Panel</Link>
					<div className={styles.sidebarContent}>
						<ul>
							{links.map((link, index) => (
								<li key={index}>
									<Link to={`${link}`}>{link.toUpperCase()}</Link>
								</li>
							))}
						</ul>
						<button className={styles.button} onClick={signOut}>
							Sign out
						</button>
					</div>
					<div className={styles.logo}>
						Go to{' '}
						<Link to={'/'} onClick={signOut}>
							MOAH
						</Link>
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
