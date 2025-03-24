import useLang from '../../hooks/useLang'
import Button from '../../ui/Button'
import styles from './Complete.module.css'
const Complete = ({ setComplete }) => {
	const { language, languagesJson } = useLang()
	return (
		<div className={styles.complete}>
			<div>{languagesJson[language].order.complete?.info}</div>
			<div>{languagesJson[language].order.complete?.thanks}</div>
			<Button
				text={languagesJson[language].order.complete?.okay}
				onClick={() => setComplete(false)}
			/>
		</div>
	)
}

export default Complete
