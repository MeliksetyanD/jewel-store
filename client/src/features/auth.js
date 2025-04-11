export async function loginRequest(login, password) {
	try {
		const response = await fetch('http://localhost:4700/auth/login', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ login, password }),
		})

		const data = await response.json()

		const { token } = data

		if (token) {
			localStorage.setItem('bearer', token)
		}
		return token ? true : false
	} catch (error) {
		console.log(error)
	}
}

export async function checkAuth() {
	const token = localStorage.getItem('bearer')
	if (!token) return 'Non Auth'

	return token
}
