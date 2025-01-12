import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import About from './pages/About/About.jsx'
import Account from './pages/Account/Account.jsx'
import Admin from './pages/Admin/Admin.jsx'
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx'
import BlogContent from './pages/AdminPanel/BlogContent/BlogContent.jsx'

import Auth from './components/Auth/Auth.jsx'
import BlogAdminEditPage from './pages/AdminPanel/BlogAdminEditPage/BlogAdminEditPage.jsx'
import BlogWrap from './pages/AdminPanel/BlogWrap/BlogWrap.jsx'
import CreateAndUpdatePage from './pages/AdminPanel/CreateAndUpdatePage/CreateAndUpdatePage.jsx'
import ProductsContent from './pages/AdminPanel/ProductsContent/ProductsContent.jsx'
import Blog from './pages/Blog/Blog.jsx'
import BlogPage from './pages/BlogPage/BlogPage.jsx'
import BlogSingle from './pages/BlogSingle/BlogSingle.jsx'
import { Cart } from './pages/Cart/Cart.jsx'
import { Contact } from './pages/Contact/Contact.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import Home from './pages/Home/Home.jsx'
import Layout from './pages/layout/Layout.jsx'
import { Shipping } from './pages/Shipping/Shipping.jsx'
import Shop from './pages/Shop/Shop.jsx'
import { SingleProductPage } from './pages/SingleProductPage/SingleProductPage.jsx'
import Terms from './pages/Terms/Terms.jsx'
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
				children: [
					{
						index: true,
						element: <BlogPage />,
					},

					{
						path: '/blog/:id',
						element: <BlogSingle />,
					},
				],
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
				path: '/contact',
				element: <Contact />,
			},
			{
				path: '/terms',
				element: <Terms />,
			},
			{
				path: '/shipping',
				element: <Shipping />,
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
	{
		path: 'admin',
		element: <Admin />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Auth />,
			},
			{
				path: 'home',
				element: <AdminPanel />,
				children: [
					{
						path: 'products',
						element: <ProductsContent />,
					},
					{
						path: 'blog',
						element: <BlogWrap />,
						children: [
							{
								index: true,
								element: <BlogContent />,
							},
							{
								path: 'create',
								element: <BlogAdminEditPage />,
							},
							{
								path: 'update/:id',
								element: <BlogAdminEditPage />,
							},
						],
					},
					{
						path: 'create',
						element: <CreateAndUpdatePage />,
					},
					{
						path: 'update/:id',
						element: <CreateAndUpdatePage />,
					},
				],
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
