import React from 'react'

function useIsMounted() {
	const isMounted = React.useRef(false)

	React.useEffect(() => {
		isMounted.current = true
		// eslint-disable-next-line no-return-assign
		return () => (isMounted.current = false)
	}, [])

	return isMounted
}

function Icon({ name, size, ...props }) {
	if (size) {
		props.width = size
		props.height = size
	}

	const [iconModule, setIconModule] = React.useState(null)
	const isMounted = useIsMounted()
	React.useEffect(() => {
		import(`../icons/${name}.svg?react`)
			.then((m) => {
				if (isMounted?.current) {
					// we can only setState after mounting the component
					console.log(m)
					setIconModule(m)
				}
			})
			.catch((err) => {
				console.warn('icon not found', name)
			})
	}, [name])

	const renderIcon = (props) => {
		if (!iconModule) return null
		return iconModule.default(props)
	}

	return renderIcon(props)
}

export default Icon
