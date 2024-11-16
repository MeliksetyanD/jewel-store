// import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { cleanCart } from '../../store/cartSlice'
import Button from '../../ui/Button'
import styles from './Form.module.css'
export const Form = ({ orderInfo, total, setModalOpen, setComplete }) => {
	const dispatch = useDispatch()
	const form = useRef()
	const [orderType, setOrderType] = useState('shipping')
	const [loading, setLoading] = useState(false)
	function selectHandler(e) {
		setOrderType(e.target.value)
	}
	function createDataSchema(data, ordertype) {
		const filtered = data.filter(item => item !== undefined)

		if (ordertype === 'postal') {
			return {
				'Առաքման հասցե փոստով': filtered[0],
				'Փոստային ինդեքս': filtered[1],
			}
		} else if (ordertype === 'shipping') {
			return {
				'Առաքմում Երևանում Հասցե': filtered[0],
				'Շենք կամ բնակարան': filtered[1],
			}
		} else {
			return {
				info: 'Պատվերը կվերցվի հետեվյալ հասցեում',
			}
		}
	}
	async function search(e) {
		e.preventDefault()
		const [
			firstName,
			lastName,
			email,
			address,
			phone,
			orderType,

			apartment,
			postCode,
			city,
		] = [
			e.target.elements.firstName?.value,
			e.target.elements.lastName?.value,
			e.target.elements.email?.value,
			e.target.elements.address?.value,
			e.target.elements.phone?.value,
			e.target.elements.orderType?.value,

			e.target.elements.apartment?.value,
			e.target.elements.postCode?.value,
			e.target.elements.city?.value,
		]

		const orderInformation = {
			name: `Անուն : ${firstName} - Ազգանուն: ${lastName}`,
			contacts: `Mail : ${email} - Հեռախոսահամար: ${phone}`,
			order: {
				orderType: orderType,
				orderInfo: createDataSchema(
					[address, apartment, city, postCode],
					orderType
				),
			},
			products: [...orderInfo, total],
		}

		try {
			setLoading(true)
			// await emailjs.send('service_3ngr6vh', 'template_qb30wff', {
			// 	order: JSON.stringify(orderInformation, null, 4),
			// })
			setComplete(true)

			console.log(JSON.stringify(orderInformation, null, 4))
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
			setComplete(true)

			setModalOpen(false)
			dispatch(cleanCart())
		}
	}
	// useEffect(() => emailjs.init('jUxpaZSeRg2iCU1Di'), [])
	return (
		<>
			{loading ? (
				<div className={styles.loader}></div>
			) : (
				<form onSubmit={search} className={styles.form} ref={form}>
					<div className={styles.formName}>
						<div>
							<label htmlFor='firstName'> First Name </label>
							<input type='text' id='firstName' required />
						</div>
						<div>
							<label htmlFor='lastName'> Last Name </label>
							<input type='text' id='lastName' required />
						</div>
					</div>
					<div className={styles.formContact}>
						<div>
							<label htmlFor='email'> Email</label>
							<input type='email' id='email' required />
						</div>
						<div>
							<label htmlFor='phone'> Contact Number</label>

							<input type='tel' id='phone' required />
						</div>
					</div>
					<div className={styles.orderType}>
						<label htmlFor='orderType'>Select Order Type</label>
						<select
							required
							name='orderType'
							className={styles.select}
							onChange={selectHandler}
						>
							<option value='shipping'>Shipping</option>
							<option value='postal'>Postal</option>
							<option value='bringToAddress'>Bring To Address</option>
						</select>
					</div>
					<div>
						{orderType === 'postal' ? (
							<div className={styles.postal}>
								<div>
									<label htmlFor='city'>City</label>
									<input type='text' id='city' required />
								</div>
								<div>
									<label htmlFor='postCode'>Post Code</label>
									<input type='text' id='postCode' required />
								</div>
							</div>
						) : orderType === 'bringToAddress' ? (
							<p className={styles.bringToAddress}>
								You can take the order to Vratsakan 15
							</p>
						) : orderType === 'shipping' ? (
							<div className={styles.shipping}>
								<div>
									<label htmlFor='address'>Your Address</label>
									<input type='text' id='address' required />
								</div>
								<div>
									<label htmlFor='apartment'> Apartment</label>
									<input type='text' id='apartment' required />
								</div>
							</div>
						) : null}
					</div>
					<div className={styles.orderBtn}>
						<Button type='submit' text='Order' />
					</div>
				</form>
			)}
		</>
	)
}
