import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import About from './pages/About/About.jsx'
import Account from './pages/Account/Account.jsx'
import Blog from './pages/Blog/Blog.jsx'
import Cart from './pages/Cart/Cart.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import Home from './pages/Home/Home.jsx'
import Layout from './pages/layout/Layout.jsx'
import Shop from './pages/Shop/Shop.jsx'
import { SingleProductPage } from './pages/SingleProductPage/SingleProductPage.jsx'
import { store } from './store/store.js'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: '/blog',
				element: <Blog />,
			},
			{
				path: '/shop',
				element: <Shop />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/account',
				element: <Account />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/product/:id',
				element: <SingleProductPage />,
			},
		],
	},
])

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
