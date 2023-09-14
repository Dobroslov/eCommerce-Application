import React from 'react';
import { IProduct } from '../../utils/types';
import styles from './productCard.module.scss';

interface IProductCardItem extends IProduct {
	handleProductClick: (id: string) => void;
}

function ProductCard(props: IProductCardItem): React.JSX.Element {
	const { name, price, id, currencyCode, image, handleProductClick } = props;
	// const cardImgStyle = {
	// backgroundImage: `url('/public/assets/images/${image}')`,
	// backgroundColor: '#ff0000',
	// };

	return (
		<li className={styles.product_card}>

			<div className={styles.product_card__img_container} style={{ backgroundImage: `url(${image})` }}>
				{/* <div className={styles.product_card__img_container} style={cardImgStyle}> */}
				<button
					type='button'
					aria-label='ADD'
					className={`${styles.product_card__link} ${styles.text_lage}`}
					onClick={() => handleProductClick(id)}
				>
					Add to cart
				</button>
			</div>
			<h3 className={`${styles.product_card__title} ${styles.title_h3}`}>
				{name}
			</h3>
			<p className={`${styles.product_card__price} ${styles.title_h4}`}>
				{`${price} ${currencyCode}`}
			</p>
		</li>
	);
}

export default ProductCard;
