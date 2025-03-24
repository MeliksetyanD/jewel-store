import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'
import styles from './Cart.module.css'

import { useEffect, useState } from 'react'
import CartModal from '../../components/CartModal/CartModal'
import Complete from '../../components/Complete/Complete'
import useLang from '../../hooks/useLang'
import { deleteFromCart } from '../../store/cartSlice'
import Button from '../../ui/Button'
export const Cart = () => {
	const { language, languagesJson } = useLang()
	const [orderInfo, setOrderInfo] = useState([])
	const [modalOpen, setModalOpen] = useState(false)
	const [complete, setComplete] = useState(false)

	const dispatch = useDispatch()
	const cartProducts = useSelector(state => state.cart.entities)

	function deleteCartItemHandler(id) {
		setOrderInfo(prevState => prevState.filter(item => item.productId !== id))
		dispatch(deleteFromCart(id))
	}
	function setOrderInfoHandler(itemId, count) {
		setOrderInfo(prevState => {
			if (prevState.some(item => item.productId === itemId)) {
				return prevState.map(item => {
					if (item.productId === itemId) {
						return { ...item, count }
					} else {
						return item
					}
				})
			} else {
				return [...prevState, { productId: itemId, count }]
			}
		})
	}
	function orderInfoCotentHandler() {
		setModalOpen(state => !state)
	}
	function total() {
		return orderInfo.reduce((acc, item) => acc + item.count * item.price, 0)
	}

	useEffect(() => {
		setOrderInfo(prevState => {
			return cartProducts.map(item => {
				return { productId: item.uid, count: 1, price: item.price }
			})
		})
	}, [cartProducts, complete])
	return (
		<div
			className={styles.cart}
			style={modalOpen ? { overflow: 'hidden' } : null}
		>
			<h1>{languagesJson[language].cart.shoppingCart}</h1>
			<div className={styles.cartContainer}>
				<div className={styles.cartItems}>
					{cartProducts.map(cartItem => {
						return (
							<CartItem
								setOrderInfoHandler={setOrderInfoHandler}
								key={cartItem.id}
								cartItem={cartItem}
								deleteCartItemHandler={deleteCartItemHandler}
							/>
						)
					})}
				</div>
				<div className={styles.cartInfo}>
					<div className={styles.cartTotal}>
						<h3>{total()} AMD</h3>
					</div>

					<Button
						className={styles.cartCheckout}
						disabled={cartProducts.length === 0}
						text={languagesJson[language].cart.checkout}
						onClick={orderInfoCotentHandler}
					/>
				</div>
				{modalOpen && (
					<CartModal
						orderInfo={orderInfo}
						setModalOpen={setModalOpen}
						setComplete={setComplete}
					/>
				)}
				{complete && <Complete setComplete={setComplete} />}
			</div>
		</div>
	)
}
