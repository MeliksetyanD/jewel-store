import { useEffect } from 'react'

const useScript = url => {
	useEffect(() => {
		const script = document.createElement('script')

		script.src = '//mod.postimage.org/phpbb3-german-family.js'
		script.async = true
		script.type = 'text/javascript'
		script.charset = 'utf-8'

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [url])
}

export default useScript
