export async function loginRequest(login, password) {
	try {
		const response = await fetch('http://localhost:4700/auth/log', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ login, password }),
		})

		const data = await response.json()
		const isAuth = data.isAuth
		if (isAuth) {
			localStorage.setItem('isAuth', isAuth)
		}

		return isAuth
	} catch (error) {
		console.log(error)
	}
}
