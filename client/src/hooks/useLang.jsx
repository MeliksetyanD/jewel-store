import { useSelector } from 'react-redux'
import languagesJson from '../../public/langs/languages.json'

const useLang = () => {
	const { language } = useSelector(state => state.languages)
	if (!language) {
		return { language: 'AM', languagesJson }
	}

	return { language, languagesJson }
}

export default useLang
