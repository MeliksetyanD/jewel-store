import { Outlet, useNavigate } from 'react-router-dom'

const BlogWrap = () => {
	const navigate = useNavigate()
	if (!localStorage.getItem('isAuth')) navigate('/admin')
	return (
		<div>
			<Outlet />
		</div>
	)
}

export default BlogWrap
