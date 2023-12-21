import { useId } from 'react'
import * as SwitchComponent from '@radix-ui/react-switch'
import styles from './switch.module.css'

export default function Switch({ children, checked, onCheckedChange }) {
	const id = useId()
	return (
		<div className={styles.SwitchWrapper}>
			<SwitchComponent.Root
				className={styles.SwitchRoot}
				id={id}
				checked={checked}
				onCheckedChange={onCheckedChange}
			>
				<SwitchComponent.Thumb className={styles.SwitchThumb} />
			</SwitchComponent.Root>
			<label className={styles.SwitchLabel} htmlFor={id}>
				{children}
			</label>
		</div>
	)
}
