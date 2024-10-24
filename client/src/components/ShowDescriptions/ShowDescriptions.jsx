import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ShowDescription.module.css'

export default function ShowDescriptionContent(content) {
	const [descShow, setDescShow] = useState(content.description)
	function showDescContent(value) {
		const linkToShow = value.linkToShow

		if (linkToShow === 'description') {
			let description = <>{value.content.description}</>
			setDescShow(description)
		} else if (linkToShow === 'additionalInfo') {
			const info = value.content.specs
			const infoKeys = Object.keys(info)

			let additionalInfo = (
				<ul
					style={{
						listStyle: 'none',
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
					}}
				>
					{' '}
					{infoKeys.map((key, index) => (
						<li key={index}>
							{key} : {info[key]}
						</li>
					))}{' '}
				</ul>
			)
			setDescShow(additionalInfo)
		} else if (linkToShow === 'reviews') {
			setDescShow(value.content.description)
		}
	}

	return (
		<>
			<div className={styles.descriptionMenu}>
				<Link
					to={''}
					className={styles.descriptionMenuLink}
					onClick={() =>
						showDescContent({
							...content,
							linkToShow: 'description',
						})
					}
				>
					Description
				</Link>
				<Link
					to={''}
					className={styles.descriptionMenuLink}
					onClick={() =>
						showDescContent({
							...content,
							linkToShow: 'additionalInfo',
						})
					}
				>
					Additionl Information
				</Link>
				<Link
					to={''}
					className={styles.descriptionMenuLink}
					onClick={() => showDescContent({ ...content, linkToShow: 'reviews' })}
				>
					Reviews
				</Link>
			</div>
			<div className={styles.descriptionContent}>{descShow}</div>
		</>
	)
}
