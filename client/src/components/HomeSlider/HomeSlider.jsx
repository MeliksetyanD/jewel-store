/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import useLang from '../../hooks/useLang'
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
	const { language, languagesJson } = useLang()
	const { index, item, ...otherProps } = props

	return (
		<div
			{...otherProps}
			style={{ backgroundImage: `url(${item.images?.[0]})` }}
			className={styles.sliderItem}
		>
			<div className={styles.sliderContent}>
				<h1>{item.name}</h1>
				<h2>{item.price} AMD</h2>
				<Link to={`/product/${item.uid}`}>
					{languagesJson[language].slider.view}
				</Link>
			</div>
		</div>
	)
}
function HomeSlider() {
	const sale = useSelector(state => state.sale.entities)

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
				{sale.map((item, index) => (
					<CustomSlide key={index} index={index + 1} item={item} />
				))}
			</Slider>
		</div>
	)
}

export default HomeSlider
