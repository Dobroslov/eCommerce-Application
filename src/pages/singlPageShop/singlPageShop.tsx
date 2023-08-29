import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductForId } from '../../services/apiServices';
import CarouselCompound from '../../components/slider/carouselCompound/carouselCompound';
import style from './singlPageShop.module.scss';
import { IProductbyId } from '../../utils/types';

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
		<div>
			<div className={style.mainContainer}>
				<CarouselCompound>
					{product.images.map((image) => (
						<CarouselCompound.CarouselPage>
							<div className={`${style.item}`}>
								<img
									src={image}
									alt=''
									onError={() => console.error`(Failed to load image: ${image})`}
								/>
							</div>
						</CarouselCompound.CarouselPage>
					))}
				</CarouselCompound>
			</div>
		</div>
	);
}
