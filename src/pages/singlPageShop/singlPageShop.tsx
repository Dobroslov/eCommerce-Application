/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductForId } from '../../services/apiServices';
import CarouselCompound from '../../components/slider/carouselCompound/carouselCompound';
import style from './singlPageShop.module.scss';
import { IProductbyId } from '../../utils/types';
import SliderModal from '../../components/modal/sliderModal';
import SubmitButton from '../../components/buttons/submitButton';

export default function ShopSinglPageProduct(): React.ReactElement {
	const { id } = useParams(); // получаем параметры ссылки
	// два параметра: 1)куда перенаправить пользователя 2)
	const [productCout, setProductCount] = useState(1);
	const [modalActive, setModalActive] = useState(false);
	const [product, setProduct] = useState<IProductbyId>({
		name: '',
		images: [''],
		description: '',
		currencyCode: '',
		price: '',
		color: '',
		weight: 1,
		stone: true,
		standard: 1,
		metall: '',
		discount: '',
		sku: '',
	});
	// const goForward = () => navigate(1); // вперёд по истории

	const handleCoutPlus = (count: number) => {
		setProductCount(count + 1);
		console.log(productCout);
	};
	const handleCoutMinus = (count: number) => {
		if (count > 1) {
			setProductCount(count - 1);
			console.log(productCout);
		}
	};

	useEffect(() => {
		if (id) {
			getProductForId(id)
				.then((data) => {
					if (data) {
						setProduct(data);
					} else {
						console.error('No data received from API');
					}
				})
				.catch((error) => {
					console.error('API request failed:', error);
				});
		}
	}, [id]);

	return (
		<div className={style.main}>
			<div className={style.body}>
				<div className={style.mainContainer}>
					<div className={style.slider}>
						<CarouselCompound>
							{product.images.map((image, index) => (
								<CarouselCompound.CarouselPage key={id ? id + index : id}>
									<div className={`${style.item}`}>
										<img
											onClick={() => {
												setModalActive(true);
											}}
											src={image}
											alt=''
										/>
									</div>
								</CarouselCompound.CarouselPage>
							))}
						</CarouselCompound>
					</div>
				</div>
				<div className={style.productBody}>
					<p className={style.productName}>{product.name}</p>
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
					<div className={style.description}>{product.description}</div>
					<div className={style.addToCartBlock}>
						<div className={style.counter}>
							<button onClick={() => handleCoutMinus(productCout)} type='button'>
								-
							</button>
							<input onChange={() => 0} value={productCout} type='number' />
							<button onClick={() => handleCoutPlus(productCout)} type='button'>
								+
							</button>
						</div>
						<div className={style.addtoCartButton}>
							<SubmitButton value='Add to Cart' />
						</div>
						<p className={style.skuMobile}>
							SKU: <span>{product.sku}</span>
						</p>
					</div>
					<p className={style.sku}>
						SKU: <span>{product.sku}</span>
					</p>
				</div>
			</div>
			<div className={style.tabs}>
				<p className={style.tabsTitle}>Aditional information</p>
				<ul>
					<li>
						Wieght: <span>{product.weight}</span>
					</li>
					<li>
						Material: <span>{product.metall}</span>
					</li>
					<li>
						Purity: <span>{product.standard}</span>
					</li>
					<li>
						Color: <span>{product.color}</span>
					</li>
				</ul>
			</div>
			<SliderModal active={modalActive} setActive={setModalActive}>
				<CarouselCompound>
					{product.images.map((image, index) => (
						<CarouselCompound.CarouselPage key={id ? id + (index + 10) : id}>
							<div className={`${style.item}`}>
								<img src={image} alt='' />
							</div>
						</CarouselCompound.CarouselPage>
					))}
				</CarouselCompound>
				<Link key={id} to={`/shop/${id}`}>
					<div className={style.showDetailsModal} />
				</Link>
			</SliderModal>
		</div>
	);
}
