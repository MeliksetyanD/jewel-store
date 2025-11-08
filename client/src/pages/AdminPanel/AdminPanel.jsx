// import React, { useEffect } from 'react'
// import { Link, Outlet, useNavigate } from 'react-router-dom'

// import { useDispatch } from 'react-redux'
// import { getBlogsAdmin, getProductsAdmin } from '../../store/adminSlice'
// import styles from './AdminPanel.module.css'

// const links = ['blog', 'products']
// const AdminPanel = () => {
// 	const dispatch = useDispatch()
// 	const navigate = useNavigate()

// 	function signOut() {
// 		localStorage.removeItem('bearer')
// 		navigate('/')
// 	}

// 	useEffect(() => {
// 		if (!localStorage.getItem('bearer')) navigate('/admin')
// 		dispatch(getProductsAdmin())
// 		dispatch(getBlogsAdmin())
// 	}, [])
// 	return (
// 		<div className={styles.AdminPanel}>
// 			<div className={styles.container}>
// 				<div className={styles.sidebar}>
// 					<Link to={'/admin/home'}>Admin Panel</Link>
// 					<div className={styles.sidebarContent}>
// 						<ul>
// 							{links.map((link, index) => (
// 								<li key={index}>
// 									<Link to={`${link}`}>{link.toUpperCase()}</Link>
// 								</li>
// 							))}
// 						</ul>
// 						<button className={styles.button} onClick={signOut}>
// 							Sign out
// 						</button>
// 					</div>
// 					<div className={styles.logo}>
// 						Go to{' '}
// 						<Link to={'/'} onClick={signOut}>
// 							MOAH
// 						</Link>
// 					</div>
// 				</div>
// 				<div className={styles.content}>
// 					<Outlet />
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default AdminPanel


import { useEffect, useState } from 'react'
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBlogsAdmin, getProductsAdmin } from '../../store/adminSlice'
import styles from './AdminPanel.module.css'

const NAV = [
  { to: 'blog', label: 'Blog' },
  { to: 'products', label: 'Products' },
]

export default function AdminPanel() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('bearer')
    if (!token) {
      navigate('/admin', { replace: true, state: { from: location } })
      return
    }
    dispatch(getProductsAdmin())
    dispatch(getBlogsAdmin())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signOut = () => {
    if (!window.confirm('Выйти из админ-панели?')) return
    localStorage.removeItem('bearer')
    navigate('/', { replace: true })
  }

  return (
    <div className={styles.wrap}>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.brand}>
          <Link to="/admin/home" className={styles.brandLink} aria-label="Admin Panel Home">
            <span className={styles.brandLogo}>⚙️</span>
            <span className={styles.brandText}>Admin Panel</span>
          </Link>
          <button
            className={styles.collapseBtn}
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              title={item.label}
            >
              <span className={styles.navDot} />
              <span className={styles.navText}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.signout} onClick={signOut}>Sign out</button>
          <div className={styles.footer}>
            <span className={styles.footerText}>Go to</span>
            <Link to="/" onClick={signOut} className={styles.footerLink}>MOAH</Link>
          </div>
        </div>
      </aside>

      <main className={styles.content}>
        <header className={styles.topbar}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.breadcrumbs}>
            <Link to="/admin/home">Admin</Link>
            <span>/</span>
            <span className={styles.crumb}>
              {location.pathname.split('/').pop() || 'home'}
            </span>
          </div>
        </header>

        <section className={styles.outlet}>
          <Outlet />
        </section>
      </main>
    </div>
  )
}
