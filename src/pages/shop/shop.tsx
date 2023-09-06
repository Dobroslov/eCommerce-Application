/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './shop.module.scss';
import Filter from './filter/filter';
import { getFilter, getProductForId } from '../../services/apiServices';
import SliderModal from '../../components/modal/sliderModal';
import CarouselCompound from '../../components/slider/carouselCompound/carouselCompound';
import { IProduct } from '../../utils/types';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Shop(): React.ReactElement {
	const localFilter = localStorage.getItem('filter');
	const [products, setProducts] = useState<IProduct[]>([]);
	const [modalActive, setModalActive] = useState(false);
	const [filter, setFilter] = useState(localFilter || '&sort=createdAt+asc');
	const [id, setId] = useState('2a736cf8-ad85-4d6e-a9ef-1adf95915f8d');
	const [images, setImages] = useState<string[]>([]);

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

	const handleSortChange = (filterData: string) => {
		setFilter(filterData);
	};

	useEffect(() => {
		getFilter(9, 0, filter)
			.then((data) => {
				if (data) setProducts(data);
			})
			.catch((error) => error);
	}, [filter]);

	localStorage.setItem('path', window.location.pathname);

	return (
		<section className={style.catalog}>
			<h3 className={style.catalogTitle}>Shop The Latest</h3>
			<div className={style.body}>
				<Filter onValueChange={handleSortChange} />
				<div className={style.products}>
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
							<div className={style.title}>
								<Link key={product.id} to={`/shop/${product.id}`}>
									{product.name}
								</Link>
							</div>
							<div className={style.price}>
								{product.discount !== 'NaN' ? (
									<>
										{product.discount} {product.currencyCode}{' '}
										<span className={style.lineThrough}>
											{product.price} {product.currencyCode}
										</span>
									</>
								) : (
									`${product.price} ${product.currencyCode}`
								)}
							</div>
						</div>
					))}
				</div>
			</div>
			<SliderModal active={modalActive} setActive={setModalActive}>
				<CarouselCompound>
					{images.map((image, index) => (
						<CarouselCompound.CarouselPage key={id ? id + index : id}>
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
