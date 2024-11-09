import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Form } from '../Form/Form'
import styles from './CartModal.module.css'
const CartModal = ({ setModalOpen, orderInfo }) => {
	const products = useSelector(state => state.products.entities)
	const ref = useRef()
	function modalClose(e) {
		if (ref.current === e.target) {
			setModalOpen(false)
		}
	}

	return (
		<div className={styles.cartModalWrapper} ref={ref} onClick={modalClose}>
			<div className={styles.cartModal}>
				<h1>Order Information</h1>
				<div>
					<div className={styles.cartModalItems}>
						{orderInfo.map(item => {
							const product = products.find(
								product => product.uid === item.productId
							)
							return (
								<div className={styles.cartModalItem} key={item.productId}>
									<p>Name : {product.name}</p>
									<p>Count : {item.count}</p>
									<p>Price : {product.price}</p>
								</div>
							)
						})}
						<div className={styles.cartModalTotal}>
							Total:{' '}
							{orderInfo.reduce(
								(acc, item) => acc + item.count * item.price,
								0
							)}
						</div>
					</div>
					<Form orderInfo={orderInfo} />
				</div>

				<button
					className={styles.cartModalClose}
					onClick={() => setModalOpen(false)}
				>
					X
				</button>
			</div>
		</div>
	)
}

export default CartModal