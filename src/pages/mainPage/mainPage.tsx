import React from 'react';
import ProductCardsList from '../../components/productCardsList/productCardsList';
import { IProductCard } from '../../utils/types';

import '../../styles/_global.scss';
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
		<main className={styles.main}>
			<div className='wrapper'>
				<div className={styles.main__img}>
					<img src='/assets/images/main-girl-with-earings.jpg' alt='girl' />
					<img src='../../assets/images/main-girl-with-earings.jpg' alt='girl' />
					<h2 className={`${styles.title_h2} ${styles.title_light}`}>Gold bih hoops</h2>
					<h3>$ 63.00</h3>
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
			</div>
		</main>
	);
}

export default MainPage;
