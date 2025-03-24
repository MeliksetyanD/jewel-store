import { useSelector } from 'react-redux'
import { categories, sort } from '../../constants/categories'
import useLang from '../../hooks/useLang'
import styles from './Filter.module.css'
const Filter = ({ setShopProducts, setOpen }) => {
	const products = useSelector(state => state.products.entities)
	const { language, languagesJson } = useLang()
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
					{categories.map((category, index) => (
						<option key={index} value={category}>
							{languagesJson[language].shop.categories[category]}
						</option>
					))}
				</select>
			</label>
			<label>
				<select name='sort' defaultValue='all' className={styles.select}>
					{sort.map((option, index) => (
						<option key={index} value={option}>
							{languagesJson[language].shop.sort[option]}
						</option>
					))}
				</select>
			</label>
			<div className={styles.switchContainer}>
				{languagesJson[language].shop.filter.onSale}

				<label className={styles.switch}>
					<input type='checkbox' name='onSale' />
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
			</div>
			<div className={styles.switchContainer}>
				{languagesJson[language].shop.filter.inStock}
				<label className={styles.switch}>
					<input type='checkbox' name='inStock' />
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
			</div>
			<button type='submit' className={styles.submitBtn}>
				{languagesJson[language].shop.filter.apply}
			</button>
		</form>
	)
}

export default Filter
