import { useEffect, useState } from 'react'
import Switch from '../../../components/Switch'

export default function SettingsForm({}) {
	const [darkMode, setDarkMode] = useState(false)

	function changeDarkMode(payload) {
		setDarkMode(payload)
		window.localStorage.setItem('darkMode', payload ? 'true' : 'false')
		if (payload) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	useEffect(() => {
		if (!window.localStorage.getItem('darkMode')) {
			const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
			changeDarkMode(darkMode)
		} else {
			changeDarkMode(window.localStorage.getItem('darkMode') === 'true')
		}
	}, [])

	function onDarkModeChange(isDark) {
		changeDarkMode(isDark)
	}

	return (
		<form>
			<Switch checked={darkMode} onCheckedChange={onDarkModeChange}>
				Dark mode
			</Switch>
			<a href="/">back</a>
		</form>
	)
}
