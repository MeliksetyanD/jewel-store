import img from '../../public/SHOPPE.svg'
import styles from './About.module.css'
const About = () => {
	return (
		<div className={styles.about}>
			<h1>About Us</h1>
			<h3>Who we are and why we do what we do!</h3>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quod.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quod.
			</p>
			<h2>Top trends</h2>
			<img src={img} alt='' width={700} height={300} />
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quod.
			</p>
			<h2>Top brands</h2>
			<img src={img} alt='' width={700} height={300} />
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quod.
			</p>
		</div>
	)
}

export default About
