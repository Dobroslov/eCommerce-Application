import React from 'react';
import { IProductCard } from '../../utils/types';
import styles from './productCard.module.scss';

interface IProductCardItem extends IProductCard {
	handleProductClick: (id: number) => void;
}

function ProductCard(props: IProductCardItem): React.JSX.Element {
	const { title, image, price, id, altImage, handleProductClick } = props;

	return (
		<li className={styles.product_card}>
			<div className={styles.product_card__img_container}>
				<img
					className={styles.product_card__img}
					src={`./assets/images/${image}`}
					alt={altImage}
				/>
				<a
					href='#{product-id}'
					className={`${styles.product_card__link} ${styles.text_lage}`}
					onClick={() => handleProductClick(id)}
				>
					Add to cart
				</a>
			</div>
			<h3 className={`${styles.product_card__title} ${styles.title_h3}`}>
				{title}
			</h3>
			<p className={`${styles.product_card__price} ${styles.title_h4}`}>
				{`$ ${price}`}
			</p>
		</li>
	);
}

export default ProductCard;
