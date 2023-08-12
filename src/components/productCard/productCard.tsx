import React from 'react';
import './productCardList.module.scss';
import { IProductCard } from '../../utils/types';

interface IProductCardItem extends IProductCard {
	handleProductClick: (id: number) => void
}

function ProductCard(props: IProductCardItem): React.JSX.Element {
	const {
		title, image, price, id, altImage, handleProductClick,
	} = props;

	return (
		<li className='products__item product-card'>
			<div className='product_card__img-container'>
				<img className='product_card__img' src={`./assets/images/${image}`} alt={altImage} />
				<a href='#{product-id}' className='product__link' onClick={() => handleProductClick(id)}>View All</a>
			</div>
			<h3 className='product-card__title'>{title}</h3>
			<p className='product-card__price'>{`$ ${price}`}</p>
		</li>
	);
}

export default ProductCard;
