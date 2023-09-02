/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './shop.module.scss';
import Filter from './filter/filter';
import { getProductForId, getSortingProducts } from '../../services/apiServices';
import { IProduct } from '../../utils/types';
import SliderModal from '../../components/modal/sliderModal';
import CarouselCompound from '../../components/slider/carouselCompound/carouselCompound';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Shop(): React.ReactElement {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [sorting, setSorting] = useState<string>('createdAt');
	const [sortLimit, setSortLimit] = useState<string>('9');
	const [sortOrder, setSortOrder] = useState<string>('desc');
	const [sortOffset, setSortOffset] = useState<string>('0');

	const [modalActive, setModalActive] = useState(false);
	const [id, setId] = useState('1');
	const [images, setImages] = useState<string[]>([]);

	// const navigate = useNavigate();

	// const goBack = () => navigate(-1);
	// const goHome = () => navigate('/', { replace: true });
	useEffect(() => {
		getProductForId(id)
			.then((data) => {
				if (data) {
					setImages(data.images);
				} else {
					console.log('No data received from API');
				}
			})
			.catch((error) => {
				console.error('API request failed:', error);
			});
	}, [id]);

	const handleSortChange = (value: string) => {
		console.log(value);
		const sortArray = value.split(' ');
		setSortLimit(sortArray[0]);
		setSortOffset(sortArray[1]);
		setSorting(sortArray[2]);
		setSortOrder(sortArray[3]);
	};

	useEffect(() => {
		getSortingProducts(sortLimit, sortOffset, sorting, sortOrder)
			.then((data) => {
				console.log(data);
				if (data) setProducts(data);
			})
			.catch((error) => error);
	}, [sorting, sortOrder]);

	return (
		<section className={style.catalog}>
			<h3 className={style.catalogTitle}>Shop The Latest</h3>
			<div className={style.body}>
				<Filter onValueChange={handleSortChange} />
				<div className={style.products}>
					{/* <button type='button' onClick={goBack}>Back</button> */}
					{/* <button type='button' onClick={goHome}>Home</button> */}
					{products.map((product) => (
						<div key={product.id} className={style.item}>
							<div className={style.image}>
								<div
									onClick={() => {
										setModalActive(true);
										setId(product.id);
									}}
								>
									<img src={product.image} alt='ring' />
								</div>
								<Link key={product.id} to={`/shop/${product.id}`}>
									<div className={style.showDetails}>Show details</div>
								</Link>
							</div>
							<Link key={product.id} to={`/shop/${product.id}`}>
								<div className={style.title}>{product.name}</div>
							</Link>
							<div className={style.price}>
								{product.price} {product.currencyCode}
							</div>
						</div>
					))}
				</div>
			</div>
			<SliderModal active={modalActive} setActive={setModalActive}>
				<CarouselCompound>
					{images.map((image) => (
						<CarouselCompound.CarouselPage>
							<div className={`${style.itemModal}`}>
								<img src={image} alt='' />
							</div>
						</CarouselCompound.CarouselPage>
					))}
				</CarouselCompound>
				<Link key={id} to={`/shop/${id}`}>
					<div className={style.showDetailsModal}>Show details</div>
				</Link>
			</SliderModal>
		</section>
	);
}
