/* eslint-disable react/prop-types */
import { useState } from 'react'
import img from '../../public/SHOPPE.svg'
import styles from './CartItem.module.css'
const CartItem = ({ cartItem, deleteCartItemHandler, setOrderInfoHandler }) => {
	const [count, setCount] = useState(1)
	function incQuantityHandler() {
		setCount(count + 1)
		setOrderInfoHandler(cartItem.uid, count + 1)
	}
	function decQuantityHandler() {
		setCount(prevState => {
			if (prevState <= 1) {
				deleteCartItemHandler(cartItem.uid)
				return 0
			}
			return prevState - 1
		})
		if (count <= 1) return
		setOrderInfoHandler(cartItem.uid, count - 1)
	}
	return (
		<div className={styles.cartItem}>
			<img src={img} width={100} height={100} alt='' />
			<div className={styles.cartItemInfo}>
				<h3 className={styles.cartItemName}>{cartItem?.name}</h3>
				<h5 className={styles.cartItemPrice}>{cartItem?.price}</h5>
			</div>
			<div className={styles.cartItemCountBox}>
				<button
					className={styles.cartItemCountButton}
					onClick={decQuantityHandler}
				>
					-
				</button>
				<div className={styles.cartItemCount}>{count}</div>
				<button
					className={styles.cartItemCountButton}
					onClick={incQuantityHandler}
				>
					+
				</button>
			</div>
			<button
				className={styles.cartItemDelete}
				onClick={() => deleteCartItemHandler(cartItem.uid)}
			>
				X
			</button>
		</div>
	)
}

export default CartItem
