import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { sliderImages } from '../../../public/slider/sliderImages'
import styles from './HomeSlider.module.css'

function SampleNextArrow(props) {
	const { className, style, onClick } = props
	return (
		<div
			className={`${className} ${styles.sliderArrowNext}`}
			style={{
				...style,
			}}
			onClick={onClick}
		/>
	)
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props
	return (
		<div
			className={`${className} ${styles.sliderArrowPrev}`}
			style={{
				...style,
			}}
			onClick={onClick}
		/>
	)
}

function CustomSlide(props) {
	const { index, image, ...otherProps } = props
	return (
		<div
			{...otherProps}
			style={{ backgroundImage: `url(${image})` }}
			className={styles.sliderItem}
		>
			<div className={styles.sliderContent}>
				<h1>Gold big hoops</h1>
				<h2>$ 68,00</h2>
				<Link to='/product/:id'>View Product</Link>
			</div>
		</div>
	)
}
function HomeSlider() {
	console.log('sliderImages', sliderImages)

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 10000,
		pauseOnHover: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	}
	return (
		<div className={styles.sliderContainer}>
			<Slider {...settings}>
				{sliderImages.map((image, index) => (
					<CustomSlide key={index} index={index + 1} image={image} />
				))}
			</Slider>
		</div>
	)
}

export default HomeSlider
