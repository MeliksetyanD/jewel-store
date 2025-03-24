import img from '../../../public/logo.svg'
import styles from './About.module.css'
const About = () => {
	1
	return (
		<div className={styles.about}>
			<h1>About Us</h1>
			<h3>Who we are and why we do what we do!</h3>
			<p className={styles.aboutInfoFirst}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quod.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quod.
			</p>
			<h2>Top trends</h2>
			<img src={img} alt='' className={styles.aboutImageFirst} />
			<p className={styles.aboutInfoSecond}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quod.
			</p>
			<h2>Top brands</h2>
			<img src={img} alt='' className={styles.aboutImageSecond} />
			<p className={styles.aboutInfoThird}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quod.
			</p>
		</div>
	)
}

export default About
