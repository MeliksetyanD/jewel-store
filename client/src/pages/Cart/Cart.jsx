import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'
import styles from './Cart.module.css'

import { useEffect, useState } from 'react'
import CartModal from '../../components/CartModal/CartModal'
import { deleteFromCart } from '../../store/cartSlice'
export const Cart = () => {
	const [orderInfo, setOrderInfo] = useState([])
	const [modalOpen, setModalOpen] = useState(false)
	const dispatch = useDispatch()
	const cartProducts = useSelector(state => state.cart.entities)

	function deleteCartItemHandler(id) {
		setOrderInfo(prevState => prevState.filter(item => item.productId !== id))
		dispatch(deleteFromCart(id))
	}
	function setOrderInfoHandler(itemId, count) {
		console.log(itemId, count)
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
	useEffect(() => {
		setOrderInfo(prevState => {
			return cartProducts.map(item => {
				return { productId: item.uid, count: 1, price: item.price }
			})
		})
	}, [])
	return (
		<div className={styles.cart}>
			<h1>Shoping Cart</h1>
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
						<h3>
							{cartProducts.reduce((acc, item) => acc + item.price, 0)} AMD
						</h3>
					</div>
					<button
						disabled={cartProducts.length === 0}
						className={styles.cartCheckout}
						onClick={orderInfoCotentHandler}
					>
						Checkout
					</button>
				</div>
				{modalOpen && (
					<CartModal orderInfo={orderInfo} setModalOpen={setModalOpen} />
				)}
			</div>
		</div>
	)
}
