import { useEffect, useState } from 'react'
import styles from './ShowDescription.module.css'
export default function ShowDescriptionContent({ content }) {
	const [product, setProduct] = useState(null)

	useEffect(() => {
		setProduct(content)
	}, [content])

	return (
		<ul className={styles.descriptionMenu}>
			{product &&
				Object.keys(product).map((item, index) => {
					return (
						<li key={index}>
							{item}: {Object.values(product)[index]}
						</li>
					)
				})}
		</ul>
	)
}
