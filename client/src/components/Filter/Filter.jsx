import { useSelector } from 'react-redux'
import styles from './Filter.module.css'
const Filter = ({ setShopProducts, setOpen }) => {
	const products = useSelector(state => state.products.entities)
	function handleSubmit(e) {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const [jewels, sort] = [...formData.entries()]
		setShopProducts(prevstate => {
			const newState = products.filter(product => {
				if (product.categoryname === jewels[1]) {
					return product
				} else if (jewels[1] === 'all') {
					return product
				}
			})
			if (sort[1] === 'asc') {
				return newState.sort((a, b) => a.price - b.price)
			}
			if (sort[1] === 'desc') {
				return newState.sort((a, b) => b.price - a.price)
			}

			return newState
		})
		setOpen(false)
	}

	return (
		<form className={`${styles.filter}`} method='post' onSubmit={handleSubmit}>
			<label>
				<select name='jewels' defaultValue='all' className={styles.select}>
					<option value='rings'>rings</option>
					<option value='earings'>earings</option>
					<option value='bracelet'>bracelet</option>
					<option value='cuff'>cuff</option>
					<option value='all'>Shop by</option>
				</select>
			</label>
			<label>
				<select name='sort' defaultValue='all' className={styles.select}>
					<option value='desc'>Price: High to Low</option>
					<option value='asc'>Price: Low to High</option>
					<option value='all'>Sort by</option>
				</select>
			</label>
			<div className={styles.switchContainer}>
				On sale
				<label className={styles.switch}>
					<input type='checkbox' name='onSale' />
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
			</div>
			<div className={styles.switchContainer}>
				In Stock
				<label className={styles.switch}>
					<input type='checkbox' name='inStock' />
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
			</div>
			<button type='submit' className={styles.submitBtn}>
				Apply
			</button>
		</form>
	)
}

export default Filter
