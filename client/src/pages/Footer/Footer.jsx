import { NavLink } from 'react-router-dom'
import Social from '../../components/Social/Social'
import styles from './Footer.module.css'
import arrow from '/arrow.svg'
export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerMenu}>
				<ul className={styles.footerMenuList}>
					<li className={styles.footerMenuItem}>
						<NavLink className={styles.footerMenuLink} to='/about'>
							CONTACT
						</NavLink>
					</li>
					<li className={styles.footerMenuItem}>
						<NavLink className={styles.footerMenuLink} to='/terms'>
							TERMS OF SERVICES
						</NavLink>
					</li>
					<li className={styles.footerMenuItem}>
						<NavLink className={styles.footerMenuLink} to='/shipping'>
							SHIPPING AND RETURNS
						</NavLink>
					</li>
				</ul>
				<form action='' className={styles.footerNewsLetterForm}>
					<input
						className={styles.footerNewsLetterInput}
						type='text'
						placeholder='Give an email, get the newsletter.'
					/>
					<div className={styles.footerNewsLetterButton}>
						<input
							className={styles.footerNewsLetterSubmit}
							type='button'
							onClick={() => {
								console.log('submit')
							}}
							value={''}
						/>
						<img src={arrow} alt='submit' width={25} height={25} />
					</div>
				</form>
			</div>

			<div className={styles.footerCopy}>
				<p className={styles.footerCopyText}>© 2024. All rights reserved.</p>
				<Social />
			</div>
		</footer>
	)
}
