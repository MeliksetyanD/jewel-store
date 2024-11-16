import { useRef, useState } from 'react'
import Filter from '../../components/Filter/Filter'
import styles from './SideFilter.module.css'
export const SideFilter = ({ setShopProducts, handleMakeToNonScroll }) => {
	const [open, setOpen] = useState(false)

	const sideFilter = useRef()
	function modalClose(e) {
		if (sideFilter.current === e.target) {
			setOpen(false)
		}
	}
	handleMakeToNonScroll(open)
	return (
		<>
			<div className={styles.sideFilter} onClick={() => setOpen(true)}>
				Filter
			</div>
			{open && (
				<div
					className={styles.filterMobile}
					ref={sideFilter}
					onClick={modalClose}
				>
					<div className={styles.filterMobileContent}>
						<button className={styles.close} onClick={() => setOpen(false)}>
							☼
						</button>
						<Filter setShopProducts={setShopProducts} setOpen={setOpen} />
					</div>
				</div>
			)}
		</>
	)
}
