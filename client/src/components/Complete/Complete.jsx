import Button from '../../ui/Button'
import styles from './Complete.module.css'
const Complete = ({ setComplete }) => {
	return (
		<div className={styles.complete}>
			<div>Ձեր պատվերը ընդունված է</div>
			<div>Շնոհակալություն</div>
			<Button text={'Լավ'} onClick={() => setComplete(false)} />
		</div>
	)
}

export default Complete
