/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './shop.module.scss';
import Filter from './filter/filter';
import { getAnonimousToken, getFilter, getProductForId } from '../../services/apiServices';
import SliderModal from '../../components/modal/sliderModal';
import CarouselCompound from '../../components/slider/carouselCompound/carouselCompound';
import { IProduct } from '../../utils/types';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Shop(): React.ReactElement {
	const localFilter = localStorage.getItem('filter');
	const localOffset = Number(localStorage.getItem('offset'));
	const [products, setProducts] = useState<IProduct[]>([]);
	const [modalActive, setModalActive] = useState(false);
	const [filter, setFilter] = useState(localFilter || '&sort=createdAt+asc');
	const [offset, setOffset] = useState(localOffset || 0);
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

	const handleOffsetNext = (nextOffset: number) => {
		setOffset(nextOffset + 9);
		localStorage.setItem('offset', (nextOffset + 9).toString());
	};

	const handleOffsetPrev = (prevOffset: number) => {
		setOffset(prevOffset - 9);
		localStorage.setItem('offset', (prevOffset - 9).toString());
	};

	useEffect(() => {
		const localAnonymousToken = localStorage.getItem('anonimous');
		if (!localAnonymousToken) {
			getAnonimousToken().then(() => {
				getFilter(9, offset || localOffset, filter)
					.then((data) => {
						if (data) setProducts(data);
					})
					.catch((error) => error);
			});
		} else {
			getFilter(9, offset || localOffset, filter)
				.then((data) => {
					if (data) setProducts(data);
				})
				.catch((error) => error);
		}
	}, [filter]);

	useEffect(() => {
		getFilter(9, offset || localOffset, localFilter || filter)
			.then((data) => {
				if (data) setProducts(data);
			})
			.catch((error) => error);
	}, [offset]);
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
							<button className={style.addtoCartButton} type='button'>
								Add to cart
							</button>
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
			<div className={style.pagination}>
				<button onClick={() => handleOffsetPrev(offset)} type='button'>
					❮
				</button>
				<button onClick={() => handleOffsetNext(offset)} type='button'>
					❯
				</button>
			</div>
		</section>
	);
}
