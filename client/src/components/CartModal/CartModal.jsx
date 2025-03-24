import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useLang from '../../hooks/useLang'
import { Form } from '../Form/Form'
import styles from './CartModal.module.css'
const CartModal = ({ setModalOpen, orderInfo, setComplete }) => {
	const { language, languagesJson } = useLang()
	const [total, setTotal] = useState()
	const products = useSelector(state => state.products.entities)
	const ref = useRef()
	function modalClose(e) {
		if (ref.current === e.target) {
			setModalOpen(false)
		}
	}

	useEffect(() => {
		setTotal(prev =>
			orderInfo.reduce((acc, item) => acc + item.count * item.price, 0)
		)
	}, [orderInfo])
	return (
		<div className={styles.cartModalWrapper} ref={ref} onClick={modalClose}>
			<div className={styles.cartModal}>
				<h1>{languagesJson[language].cartModal?.title}</h1>
				<div className={styles.cartModalContentWrapper}>
					<div className={styles.cartModalItems}>
						{orderInfo.map(item => {
							const product = products.find(
								product => product.uid === item.productId
							)

							return (
								<div className={styles.cartModalItem} key={item.productId}>
									<img src={product.images[0]} alt='img' />
									<p>
										{languagesJson[language].order?.productInfo.name} {'|   '}
										{product.name}
									</p>
									<p>
										{languagesJson[language].order?.productInfo.count} {'|   '}
										{item.count}
									</p>
									<p>
										{languagesJson[language].order?.productInfo.price} {'|   '}
										{product.price}
									</p>
								</div>
							)
						})}
						<div className={styles.cartModalTotal}>
							{languagesJson[language].order?.productInfo.total}: {total}
						</div>
					</div>
					<Form
						orderInfo={orderInfo}
						total={total}
						setModalOpen={setModalOpen}
						setComplete={setComplete}
					/>
				</div>

				<button
					className={styles.cartModalClose}
					onClick={() => setModalOpen(false)}
				>
					✘
				</button>
			</div>
		</div>
	)
}

export default CartModal
