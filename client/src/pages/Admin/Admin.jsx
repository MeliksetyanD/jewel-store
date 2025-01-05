import { Outlet } from 'react-router-dom'
import styles from './Admin.module.css'

const Admin = () => {
	return (
		<div className={styles.admin}>
			<Outlet />
		</div>
	)
}

export default Admin
