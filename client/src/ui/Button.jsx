import React from 'react'
import styles from './Button.module.css'
const Button = ({ onClick, type, text, disabled }) => {
	return (
		<button
			disabled={disabled}
			className={styles.button}
			onClick={onClick}
			type={type}
		>
			{text}
		</button>
	)
}

export default Button
