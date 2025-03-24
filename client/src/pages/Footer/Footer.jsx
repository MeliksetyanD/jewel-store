import { NavLink } from 'react-router-dom'
import Social from '../../components/Social/Social'
import useLang from '../../hooks/useLang'
import styles from './Footer.module.css'
export const Footer = () => {
	const { language, languagesJson } = useLang()
	return (
		<footer className={styles.footer}>
			<div className={styles.footerMenu}>
				<ul className={styles.footerMenuList}>
					<li className={styles.footerMenuItem}>
						<NavLink className={styles.footerMenuLink} to='/about'>
							{languagesJson[language].footer.contact}
						</NavLink>
					</li>
					<li className={styles.footerMenuItem}>
						<NavLink className={styles.footerMenuLink} to='/terms'>
							{languagesJson[language].footer.terms}
						</NavLink>
					</li>
					<li className={styles.footerMenuItem}>
						<NavLink className={styles.footerMenuLink} to='/shipping'>
							{languagesJson[language].footer.shipping}
						</NavLink>
					</li>
				</ul>
			</div>

			<div className={styles.footerCopy}>
				<p className={styles.footerCopyText}>
					{languagesJson[language].footer.copy}
				</p>
				<Social />
			</div>
		</footer>
	)
}
