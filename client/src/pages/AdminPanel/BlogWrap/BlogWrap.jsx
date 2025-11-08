// import { Outlet, useNavigate } from 'react-router-dom'

// const BlogWrap = () => {
// 	const navigate = useNavigate()
// 	if (!localStorage.getItem('bearer')) navigate('/admin')
// 	return (
// 		<div>
// 			<Outlet />
// 		</div>
// 	)
// }

// export default BlogWrap


import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function BlogWrap() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('bearer')
    if (!token) {
      navigate('/admin', { replace: true, state: { from: location } })
    }
  }, [navigate, location])

  return <Outlet />
}

