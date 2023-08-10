import React from 'react';
import './productCard.module.scss';

function ProductCard() {
	return (
		<li className='products__item product-card'>
			<div className='product_card__img-container'>
				<img className='product_card__img' src='./assets/images/gold_ring_2.jpg' alt='gold ring finit' />
			</div>
			<h3 className='product-card__title'>Lira Earrings</h3>
			<p className='product-card__price'>$ 20,00</p>
		</li>
	);
}

export default ProductCard;
