import { useState } from 'react'
import styles from './Form.module.css'
export const Form = ({ orderInfo }) => {
	const [orderType, setOrderType] = useState('shipping')
	function selectHandler(e) {
		setOrderType(e.target.value)
	}
	function search(e) {
		e.preventDefault()
		const [
			firstName,
			lastName,
			email,
			address,
			phone,
			orderType,
			orderTypeInfo,
		] = [
			e.target.elements[0].value,
			e.target.elements[1].value,
			e.target.elements[2].value,
			e.target.elements[3].value,
			e.target.elements[4].value,
			e.target.elements[5].value,
			e.target.elements[6].value,
		]
		console.log(
			firstName,
			lastName,
			email,
			address,
			phone,
			orderType,
			orderTypeInfo,
			orderInfo
		)
	}
	return (
		<form onSubmit={search} className={styles.form}>
			<div>
				{' '}
				<input type='text' placeholder='First Name' />
				<input type='text' placeholder='Last Name' />
			</div>
			<input type='email' placeholder='Enter your email' />

			<input type='tel' placeholder='Enter your phone number' />
			<select name='orderType' onChange={selectHandler}>
				<option value='shipping'>Shipping</option>
				<option value='postal'>Postal</option>
				<option value='bringToAddress'>Bring To Address</option>
			</select>
			{orderType === 'postal' ? (
				<div>
					<input type='text' placeholder='Enter your city' />

					<input type='text' placeholder='Enter your postal code' />
				</div>
			) : orderType === 'bringToAddress' ? (
				<p>You can take the order to Vratsakan 15</p>
			) : orderType === 'shipping' ? (
				<div>
					<input type='text' placeholder='Enter your address' />
					<input type='text' placeholder='Enter your apartment' />
				</div>
			) : null}
			<button type='submit'>Search</button>
		</form>
	)
}
