import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Social.module.css'
const Social = () => {
	return (
		<div className={styles.footerSocial}>
			<Link
				className={styles.footerSocialLink}
				to='https://www.instagram.com/moah_jewelery/'
				target='_blank'
			>
				<svg
					width='18'
					height='18'
					viewBox='0 0 18 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M13 0H5C2.23858 0 0 2.23858 0 5V13C0 15.7614 2.23858 18 5 18H13C15.7614 18 18 15.7614 18 13V5C18 2.23858 15.7614 0 13 0ZM16.25 13C16.2445 14.7926 14.7926 16.2445 13 16.25H5C3.20735 16.2445 1.75549 14.7926 1.75 13V5C1.75549 3.20735 3.20735 1.75549 5 1.75H13C14.7926 1.75549 16.2445 3.20735 16.25 5V13ZM13.75 5.25C14.3023 5.25 14.75 4.80228 14.75 4.25C14.75 3.69772 14.3023 3.25 13.75 3.25C13.1977 3.25 12.75 3.69772 12.75 4.25C12.75 4.80228 13.1977 5.25 13.75 5.25ZM9 4.50001C6.51472 4.50001 4.5 6.51473 4.5 9.00001C4.5 11.4853 6.51472 13.5 9 13.5C11.4853 13.5 13.5 11.4853 13.5 9.00001C13.5027 7.80572 13.0294 6.65958 12.1849 5.81509C11.3404 4.9706 10.1943 4.49735 9 4.50001ZM6.25 9C6.25 10.5188 7.48122 11.75 9 11.75C10.5188 11.75 11.75 10.5188 11.75 9C11.75 7.48122 10.5188 6.25 9 6.25C7.48122 6.25 6.25 7.48122 6.25 9Z'
						fill='#707070'
					/>
				</svg>
			</Link>
			<Link
				className={styles.footerSocialLink}
				to='https://www.facebook.com/profile.php?id=100082242420396'
				target='_blank'
			>
				<svg
					width='10'
					height='18'
					viewBox='0 0 10 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M9.5 3H6.5C5.94772 3 5.5 3.44772 5.5 4V7H9.5C9.61374 6.99748 9.7216 7.05039 9.78923 7.14188C9.85685 7.23336 9.87578 7.35201 9.84 7.46L9.1 9.66C9.03181 9.86192 8.84312 9.99842 8.63 10H5.5V17.5C5.5 17.7761 5.27614 18 5 18H2.5C2.22386 18 2 17.7761 2 17.5V10H0.5C0.223858 10 0 9.77614 0 9.5V7.5C0 7.22386 0.223858 7 0.5 7H2V4C2 1.79086 3.79086 0 6 0H9.5C9.77614 0 10 0.223858 10 0.5V2.5C10 2.77614 9.77614 3 9.5 3Z'
						fill='#707070'
					/>
				</svg>
			</Link>
		</div>
	)
}

export default Social
