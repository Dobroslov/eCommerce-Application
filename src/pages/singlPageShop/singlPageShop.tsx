import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductForId } from '../../services/apiServices';
import CarouselCompound from '../../components/slider/carouselCompound/carouselCompound';
import style from './singlPageShop.module.scss';
import { IProductbyId } from '../../utils/types';
import LoginButton from '../../components/buttons/loginButton';

export default function ShopSinglPageProduct(): React.ReactElement {
	const { id } = useParams(); // получаем параметры ссылки
	// два параметра: 1)куда перенаправить пользователя 2)
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
	});
	// const goForward = () => navigate(1); // вперёд по истории

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
							{product.images.map((image) => (
								<CarouselCompound.CarouselPage>
									<div className={`${style.item}`}>
										<img src={image} alt='' />
									</div>
								</CarouselCompound.CarouselPage>
							))}
						</CarouselCompound>
					</div>
				</div>
				<div className={style.productBody}>
					<p className={style.productName}>{product.name}</p>
					<div className={style.price}>
						{product.price} {product.currencyCode}
					</div>
					<div className={style.description}>{product.description}</div>
					<div className={style.addToCartBlock}>
						<div className={style.counter}>Counter</div>
						<LoginButton value='Add to Cart' />
						<p className={style.skuMobile}>
							SKU: <span>12</span>
						</p>
					</div>
					<p className={style.sku}>
						SKU: <span>12</span>
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
		</div>
	);
}
