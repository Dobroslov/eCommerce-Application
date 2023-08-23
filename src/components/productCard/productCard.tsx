import React from 'react';
import { IProductCard } from '../../utils/types';
import styles from './productCard.module.scss';

interface IProductCardItem extends IProductCard {
	handleProductClick: (id: number) => void;
}

function ProductCard(props: IProductCardItem): React.JSX.Element {
	const { title, price, id, handleProductClick } = props;
	// const cardImgStyle = {
	// backgroundImage: `url('/public/assets/images/${image}')`,
	// backgroundColor: '#ff0000',
	// };

	return (
		<li className={styles.product_card}>
			<div className={styles.product_card__img_container}>
				{/* <div className={styles.product_card__img_container} style={cardImgStyle}> */}
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
