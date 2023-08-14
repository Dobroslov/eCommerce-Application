import React from 'react';
import ProductCardsList from '../../components/productCardsList/productCardsList';
import { IProductCard } from '../../utils/types';
import MAIN_IMAGE from '../../../public/assets/images/main-girl-with-earings.jpg';

import styles from './mainPage.module.scss';

function MainPage(): React.ReactElement {
	const sampleCardData: IProductCard[] = [
		{
			id: 1, title: 'Card 1', image: 'gold_ring_2.jpg', price: 20, altImage: 'gold ring',
		},
		{
			id: 2, title: 'Card 2', image: 'gold_ring.jpg', price: 30, altImage: 'gold ring',
		},
		{
			id: 3, title: 'Card 3', image: 'gold_ring_2.jpg', price: 40, altImage: 'gold ring',
		},
	];

	function handleProductClick(id: number): void {
		console.log('handleProductClick', id);
	}

	return (
		<>
			<div className={styles.main__img_container}>
				<img className={styles.main__img} src={MAIN_IMAGE} alt='girl' />
				<div className={styles.main__product_card_info}>
					<h2 className={`${styles.title_h1} ${styles.main__title_light}`}>Gold big hoops</h2>
					<h3 className={`${styles.title_h2} ${styles.main__title_light}`}>$ 63.00</h3>
				</div>
			</div>
			<div className={styles.catalog}>
				<div className={styles.catalog__title}>
					<h2 className={`${styles.title_h2} ${styles.catalor__title}`}>Shop The Latest</h2>
					<a href='#top' className={`${styles.catalog__link} ${styles.title_h4}`}>View All</a>
				</div>
				<ProductCardsList
					products={sampleCardData}
					handleProductClick={handleProductClick}
				/>
			</div>
		</>
	);
}

export default MainPage;
