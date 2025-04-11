import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../../features/auth'
import styles from './Auth.module.css'

const Auth = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate()
	async function authHandle(e) {
		e.preventDefault()
		const [login, password] = [
			e.target.elements[0].value,
			e.target.elements[1].value,
		]
		try {
			const isAuth = await loginRequest(login, password)
			if (isAuth) {
				navigate('/admin/home')
			} else {
				setErrorMessage('wrong password')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={styles.Admin}>
			<div className={styles.container}>
				{errorMessage && <p className={styles.error}>{errorMessage}</p>}
				<form onSubmit={authHandle} className={styles.auth}>
					<input type='text' placeholder='Login' />
					<input type='password' placeholder='Password' />
					<button type='submit' className={styles.button}>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Auth
