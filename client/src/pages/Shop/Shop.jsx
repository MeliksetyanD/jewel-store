import Product from '../../components/Product/Product'
import styles from './Shop.module.css'
const Shop = () => {
	function handleSubmit(e) {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const selectData = [...formData.entries()]
		console.log(selectData)
	}
	return (
		<section className={styles.shop}>
			<h1>Shop Ther Latest</h1>
			<div className={styles.shopContent}>
				<form className={styles.filter} method='post' onSubmit={handleSubmit}>
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
						<select name='jewels' defaultValue='all' className={styles.select}>
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
				<div className={styles.products}>
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
					<Product />
				</div>
			</div>
		</section>
	)
}

export default Shop
